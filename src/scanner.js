const R = require('ramda');
const { DOCUMENT_ENTRY_SEPARATOR } = require('./constants');
const { createEntryParser } = require("./parser");

function createScanner(dependencies = {}) {
  const {
    parser = createEntryParser()
  } = dependencies;

  const sanitizeEntry = R.replace(/\n/g, '');

  const removeEmptyEntries = R.filter(Boolean);

  const parseEntries = R.map(
    R.pipe(
      sanitizeEntry,
      parser.parse
    )
  );

  const scan = R.pipe(
    R.split(DOCUMENT_ENTRY_SEPARATOR),
    removeEmptyEntries,
    parseEntries
  );

  return {
    scan
  };
}
exports.createScanner = createScanner;
