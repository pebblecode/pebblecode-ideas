module.exports = function(options) {
  options = options || {};

  if (!options.text) {
    return false;
  }

  var structure = {
    submittedFrom: options.submittedFrom || '',
    submittedDisplay: options.submittedDisplay || 'Anonymous',
    text: options.text,
    votesYes: 0,
    votesNo: 0,
    created: Date.now()
  };

  return structure;
}