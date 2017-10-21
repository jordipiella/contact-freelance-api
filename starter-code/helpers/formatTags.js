module.exports = function formatTags(tagsArray) {
    const resultArrayTags = [];
    for (let i = 0; i < tagsArray.length; i++) {
        resultArrayTags.push(tagsArray[i].value); 
    };
    return resultArrayTags;
}