export const formatNumber = (number) => {

    number += ''; // convert to string
    number.replace(/\s/g, ''); // remove any space

    let formatedNumber = '';

    for (let i = 0; i < number.length; i++) {
        if (i % 4 == 0 && i > 0) formatedNumber = formatedNumber.concat(' '); //add space between
        formatedNumber = formatedNumber.concat(number[i]); // Concat the new number
    }

    return formatedNumber;

}