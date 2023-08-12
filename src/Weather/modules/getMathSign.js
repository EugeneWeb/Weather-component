function getMathSign(temp) {
    let mathSign
    if(temp > 0) {
        mathSign = '+'
    }
    else if(temp === 0) {
        mathSign = ''
    }
    else {
        mathSign = '-'
    }
    return mathSign
}

export { getMathSign }