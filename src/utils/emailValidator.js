let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

exports.emailIsValid = (email) => {
    return regex.test(email);
}