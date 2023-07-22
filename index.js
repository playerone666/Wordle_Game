const wordle = 5;//5个字母的单词
const chance = 6;//一共有6次机会
let random = Math.floor(Math.random()*(words.length - 1));
let answer = words[random];//生成随机单词
let times = 1;//第几次猜
let index = 0;//单词的第几个字母
let guess = [];//填字格
let got = false;//是否猜对

//keyboard
window.handleInput = (event) => {
    if(got || times>chance || index==wordle) return;//退出
    
    const letter = event.target.innerText;//获取键盘字母

    guess[times-1] = guess[times-1] || [];//初始化数组
    guess[times-1][index] = letter;//保存字母
    document.getElementById(times.toString() + index.toString()).innerText = letter;//显示输入的字母
    index++;//准备输入下一个字母
};

//backButton
window.handleBack = (event) => {
    if(got || times>chance || index==0) return;//退出
    index--;
    document.getElementById(times.toString() + index.toString()).innerText = "";//回退一格
};

//guessButton
window.handleGuess = (event) => {
    if(got || times>chance || index!=wordle) return;
    const word =guess[times-1].join("");//字母连接成为单词

    if(words.indexOf(word.toLowerCase()) == -1) {       //判断是否是正确拼写的单词
        alert("Not in word list !");
        return;
    }
    if(answer == word.toLowerCase()) {     //猜对答案
        got = true;
        alert("You are right !");
    }

    let green = answer;  //绿色为正确答案
    guess[times-1].forEach((letter,i) => {
        if(answer[i] == letter.toLowerCase()) {
            document.getElementById(times.toString() + i.toString()).style.backgroundColor = "#6aaa64";//替换绿色背景
            document.getElementById(times.toString() + i.toString()).style.color = "#fff";
            green = green.substring(0,i) + " " +  green.substring(i+1);//替换字母
            document.getElementById(letter).style.backgroundColor = "#6aaa64";//替换键盘
            document.getElementById(letter).style.color = "#fff";
        }
    });

    let yellow = green;
    guess[times-1].forEach((letter,i) => {
        if(green[i] != " "){
            const j = yellow.indexOf(letter.toLowerCase());
            if (j == -1) {
                document.getElementById(times.toString() + i.toString()).style.backgroundColor = "#787c7e";
                document.getElementById(times.toString() + i.toString()).style.color = "#fff";
                document.getElementById(letter).style.backgroundColor = "#787c7e";
                document.getElementById(letter).style.color = "#fff";
            } else {
                document.getElementById(times.toString() + i.toString()).style.backgroundColor = "#c9b458";
                document.getElementById(times.toString() + i.toString()).style.color = "#fff";
                yellow = yellow.substring(0,j) + " " + yellow.substring(j + 1);//替换字母
                document.getElementById(letter).style.backgroundColor = "#c9b458";
                document.getElementById(letter).style.color = "#fff";
            }
        }
    });
    //猜的次数达到了六次
    if(got==false&&times==chance) {
        alert("Fail ! The answer is ' " + answer + " ' ");
        return;
    }

    times++;//没有猜对，次数加一
    index=0;
};

window.answerClick = (event) => {
    alert("the answer is ' " + answer +  " '");//作弊一下，查看答案
}

window.helpClick = (event) => {
    alert("你有六次机会猜测隐藏的单词，绿色表示字母位置正确；黄色表示答案包含该字母但位置错误；灰色表示答案没有该字母");
}

//重新开始游戏
window.restartClick = (event) => {


    location.reload();
}

//响应键盘
document.onkeydown = function(event) {
    if(event.keyCode >=65 && event.keyCode <=90) {  //  输入字母A-Z
        const letter = event.key.toUpperCase();
        window.handleInput({
            target:{
                innerText:letter
            }
        });
    }else if (event.keyCode ==13){   //回车键
        window.handleGuess();
    }else if (event.keyCode == 8){   //退格键
        window.handleBack();
    }
}
