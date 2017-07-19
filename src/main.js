/**
 * Created by lwj_312 on 17-7-18.
 */

var readlineSync = require('readline-sync');
var studentInfoPromptString=require('./studentInfoPromptString.js');
var report=require('./report');
let Achieve=[];

function buildMainMenuString() {
    let answer=readlineSync.question("1. 添加学生"+'\n'+"2. 生成成绩单"+'\n'+"3. 退出"+'\n'+"请输入你的选择（1～3）：");
    console.log("你的选择是："+answer);
    return answer;
}


function addStudentAchievement() {
    let information=readlineSync.question("请输入学生信息（格式：姓名, 学号, 民族, 班级, 学科: 成绩, ...），按回车提交").split(",");
    if(information.length<8||information[1].charAt(0)!='U')
        addStudentinfoAgain();
    else { for(let i=4;i<information.length;i++) {
           if (parseFloat(information[i].split(":")[1]).toString()!= information[i].split(":")[1])
            addStudentinfoAgain();
           }

           Achieve=studentInfoPromptString.buildStudentinfoPromptString(information.join(","));
           if(readlineSync.question("学生"+information[0]+"的成绩被添加,按任意键继续")!==undefined)
              return main();


    }
}

function addStudentinfoAgain() {
    let information=readlineSync.question("请按正确的格式输入（格式：姓名, 学号, 民族, 班级, 学科: 成绩, ...）：").split(",");
    if(information.length<8)
        addStudentinfoAgain();
    else { for(let i=4;i<information.length;i++) {
            if (parseFloat(information[i].split(":")[1]).toString()!= information[i].split(":")[1])
            addStudentinfoAgain();
           }

        Achieve=studentInfoPromptString.buildStudentinfoPromptString(information.join(","));
        if(readlineSync.question("学生"+information[0]+"的成绩被添加,按任意键继续")!==undefined)
            return main();

    }
}

function printReport() {
    let studynumbers=readlineSync.question("请输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：").split(",");
    for(let sn of studynumbers){
        if(sn.charAt(0)!='U') inputsStudyNumberAgain();
    }
    if(readlineSync.question(report.generateReport(studynumbers,Achieve)+'\n'+"成绩单已打印,按任意键继续")!==undefined)
        return main();
}

function inputsStudyNumberAgain() {
    let studynumbers=readlineSync.question("请按正确的格式输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：").split(",");
    for(let sn of studynumbers){
        if(sn.charAt(0)!='U') inputsStudyNumberAgain();
    }

    if(readlineSync.question(report.generateReport(studynumbers,Achieve)+'\n'+"成绩单已打印,按任意键继续")!==undefined)
        return main();

}


function main() {
    let answer=buildMainMenuString();
    switch (answer) {
        case '1':
            addStudentAchievement();
            break;

        case '2':
            printReport();
            break;

        case '3':
           process.exit(0);

        default:
            console.log('\n'+"格式错误，请再次输入：");
            main();

    }

}


main();

module.exports={
    main,
    buildMainMenuString,
    addStudentAchievement,
    addStudentinfoAgain
};