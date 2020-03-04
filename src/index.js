function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    //------check for errors
    let strWithoutOneBrct = expr.replace(/[\s\(]/g, '');
    let strWithoutOnotherBrct = expr.replace(/[\s\)]/g, '');
    if ( strWithoutOneBrct.length !== strWithoutOnotherBrct.length ) {
        throw new Error("ExpressionError: Brackets must be paired");
    }
    if ( (/[\/]\s?[0]/).test(expr) ) {
        throw new Error("TypeError: Division by zero.");
    }


    //-------let's reorganize our array of numbers & signs
    const signs = [")", "(", "+", "-", "*", "/"];
    let filterStack = [];
    let temporaryStack = [];
    let arrOfExpr = expr.match(/\d+|\+|\-|\*|\/|\(|\)/g);

    for (let i = 0; i < arrOfExpr.length; i++) {
        if (!isNaN(arrOfExpr[i])) {
            filterStack.push(arrOfExpr[i]);
        } else if (arrOfExpr[i] === "(") {
            temporaryStack.push(arrOfExpr[i]);
        } else if (arrOfExpr[i] === ")") {
            while (true) {
                let lastOneSymb = temporaryStack.pop();
                if (lastOneSymb !== "(") {
                    filterStack.push(lastOneSymb);
                } else {
                    break;
                }
            }

        } else if (signs.includes(arrOfExpr[i])) {
            while (true) {
                let lastTemp = temporaryStack[temporaryStack.length - 1];
                if ( ( (/\+|\-|\*|\//).test(lastTemp) && ( arrOfExpr[i]==='+' || arrOfExpr[i]==='-') )
                    || ( /\*|\//).test(lastTemp) && ( arrOfExpr[i]==='*' || arrOfExpr[i]==='/') ) {

                    filterStack.push(temporaryStack.pop());
                } else {
                    temporaryStack.push(arrOfExpr[i]);
                    break;
                }
            }
        }
    }
    while (temporaryStack.length > 0) {
        filterStack.push(temporaryStack.pop());
    }


    //-------------------------let's count
    let count = [];
    for (let i = 0; i < filterStack.length; i++) {
        if (!isNaN(filterStack[i])) {
            count.push(filterStack[i]);
        } else {
            let b = count.pop();
            let a = count.pop();
            switch (filterStack[i]) {
                case "+": { count.push(+a + +b);
                    break;
                }
                case "-": { count.push(+a - +b);
                    break;
                }
                case "*": { count.push(+a * +b);
                    break;
                }
                case "/": { count.push(+a / +b);
                    break;
                }
            }
        }
    }

    return count.pop();
}

module.exports = {
    expressionCalculator
}
