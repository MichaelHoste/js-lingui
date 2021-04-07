import fs from "fs"
import PO from "pofile"
import https from "https"

// Initialize project with source and existing translations (only 1 time!)
// Cf. https://translation.io/docs/create-library#initialization
export function init(config, options, successCallback, failCallback) {
  const sourceLocale  = config.sourceLocale || 'en'
  const targetLocales = config.locales.filter((value) => value != sourceLocale)
  const paths         = poPathsPerLocale(config)

  let segments = {}

  targetLocales.forEach((targetLocale) => {
    segments[targetLocale] = []
  })

  // Create segments from source language PO items
  paths[sourceLocale].forEach((path) => {
    let raw = fs.readFileSync(path).toString()
    let po = PO.parse(raw)

    po.items.filter((item) => !item.obsolete).forEach((item) => {
      targetLocales.forEach((targetLocale) => {
        let newSegment = createSegmentFromPoItem(item)

        segments[targetLocale].push(newSegment)
      })
    })
  })

  // Add translations to segments from target language PO items
  targetLocales.forEach((targetLocale) => {
    paths[targetLocale].forEach((path) => {
      let raw = fs.readFileSync(path).toString()
      let po = PO.parse(raw)

      po.items.filter((item) => !item.obsolete).forEach((item, index) => {
        segments[targetLocale][index].target = item.msgstr[0]
      })
    })
  })

  let request = {
    "client": "lingui",
    "version": require("../package.json").version,
    "source_language": sourceLocale,
    "target_languages": targetLocales,
    "segments": segments
  }

  postTio("init", request, config.apiKey, (response) => {
    if (response.errors) {
      failCallback(response.errors)
    }
    else {
      saveSegmentsToTargetPos(paths, response.segments)
      successCallback(response.project)
    }
  })
}

// Send all source text and receive all corresponding translations from Translation.io
// Cf. https://translation.io/docs/create-library#synchronization
export function sync(config, options, successCallback, failCallback) {
  const sourceLocale  = config.sourceLocale || 'en'
  const targetLocales = config.locales.filter((value) => value != sourceLocale)
  const paths         = poPathsPerLocale(config)

  let segments = []

  // Create segments with correct source
  paths[sourceLocale].forEach((path) => {
    let raw = fs.readFileSync(path).toString()
    let po = PO.parse(raw)

    po.items.filter((item) => !item.obsolete).forEach((item) => {
      let newSegment = createSegmentFromPoItem(item)

      segments.push(newSegment)
    })
  })

  let request = {
    "client": "lingui",
    "version": require("../package.json").version,
    "source_language": sourceLocale,
    "target_languages": targetLocales,
    "segments": segments
  }

  postTio("sync", request, config.apiKey, (response) => {
    if (response.errors) {
      failCallback(response.errors)
    }
    else {
      saveSegmentsToTargetPos(paths, response.segments)
      successCallback(response.project)
    }
  })
}

function createSegmentFromPoItem(item) {
  let segmentIsPlural = item.msgstr.length > 1
  let segmentHasKey   = item.msgid != item.msgstr[0] && item.msgstr[0].length
  let segmentType     = !segmentIsPlural && segmentHasKey ? 'key' : 'source' // no key support for plurals!

  let segment = {
    type: segmentType,
    source: segmentHasKey ? item.msgstr[0] : item.msgid // if source segment, msgstr may be empty if --overwrite is used
  }

  if (segmentType == 'key') {
    segment.key = item.msgid
  }

  if (item.references.length) {
    segment.references = item.references
  }

  if (item.extractedComments.length) {
    segment.comment = item.extractedComments.join(' | ')
  }

  return segment
}

function createPoItemFromSegment(segment) {
  let segmentIsPlural = "source_plural" in segment

  let item = new PO.Item()

  item.msgid             = segment.type == "key" ? segment.key : segment.source
  item.msgstr            = [segment.target]
  item.references        = (segment.references && segment.references.length) ? segment.references : []
  item.extractedComments = segment.comment ? segment.comment.split(' | ') : []

  //item.msgid_plural = null

  return item
}

function saveSegmentsToTargetPos(paths, segmentsPerLanguage) {
  Object.keys(segmentsPerLanguage).forEach((targetLanguage) => {
    const languagePath = paths[targetLanguage][0]
    const segments     = segmentsPerLanguage[targetLanguage]

    let po = new PO()
    let items = []

    segments.forEach((segment) => {
      let item = createPoItemFromSegment(segment)
      items.push(item)
    })

    // Sort items by msgids
    po.items = items.sort((a, b) => {
      if (a.msgid < b.msgid) { return -1 }
      if (a.msgid > b.msgid) { return 1 }
      return 0
    })

    po.save(languagePath, (err) => {
      console.log(err)
    })
  })
}

function poPathsPerLocale(config) {
  const NAME = "{name}"
  const LOCALE = "{locale}"
  const paths = []

  config.locales.forEach((locale) => {
    paths[locale] = []

    config.catalogs.forEach((catalog) => {
      paths[locale].push("".concat(catalog.path.replace(LOCALE, locale).replace(NAME, "*"), ".").concat('po'))
    })
  })

  return paths
}

function postTio(action, request, apiKey, successCallback, failCallback) {
  let jsonRequest = JSON.stringify(request)

  let options = {
    hostname: 'translation.io',
    path: '/api/v1/segments/' + action + '.json?api_key=' + apiKey,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  }

  let req = https.request(options, (res) => {
    console.log('statusCode:', res.statusCode)
    res.setEncoding('utf8')

    let body = ""

    res.on('data', (chunk) => {
      body = body.concat(chunk)
    })

    res.on('end', () => {
      let response = JSON.parse(body)
      successCallback(response)
    })
  })

  req.on('error', (e) => {
    console.log(e)
    console.error(e)
    failCallback(e)
  })

  req.write(jsonRequest)
  req.end()
}
