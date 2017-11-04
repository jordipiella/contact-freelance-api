module.exports = function formatTags(tagsArray) {
    const resultArrayTags = [];
    for (let i = 0; i < tagsArray.length; i++) {
        if (tagsArray[i].value){
            resultArrayTags.push(tagsArray[i].value); 
        } else {
            resultArrayTags.push(tagsArray[i]); 
        }   
    };
    return resultArrayTags;
}