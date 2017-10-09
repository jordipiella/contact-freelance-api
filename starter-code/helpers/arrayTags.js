module.exports = function arrayTags (tagsString) {
  var arrayTags = tagsString.split(' ').join('')
  arrayTags = arrayTags.split(",");
  return  arrayTags;
}