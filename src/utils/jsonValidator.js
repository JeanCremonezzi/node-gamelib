exports.jsonIsValid = (obj, fields) => {
    return fields.every((key) => obj.hasOwnProperty(key));
}

exports.fieldsAreValid = (obj) => {
    return Object.values(obj).every((value) => value != null && value.trim() != "");
}