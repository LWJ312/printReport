/**
 * Created by lwj_312 on 17-7-19.
 */

function generateReport(studynumbers,Achieve) {
    let str='';
    for(let sn of studynumbers) {
        for (let a of Achieve) {
            if (a.indexOf(sn) != -1) {
                str += a.split(",")[0] + '|' + parseFloat(a.split(",")[4].split(":")[1]) + '|' + parseFloat(a.split(",")[5].split(":")[1]) + '|' + parseFloat(a.split(",")[6].split(":")[1]) + '|' + parseFloat(a.split(",")[7].split(":")[1]) + '|' + calculatePer(a).average + '|' + calculatePer(a).total + '\n';
            }
        }
    }
    let classCondition_average=classCondition(Achieve).average;
    let classCondition_mid=classCondition(Achieve).mid;
    return`成绩单
姓名|数学|语文|英语|编程|平均分|总分 
========================
${str}
========================
全班总分平均数：${classCondition_average}
全班总分中位数：${classCondition_mid}`

}

function calculatePer(personInfo) {
    let total=0;
    for(let t=4;t<personInfo.split(",").length;t++){
        total+=parseFloat(personInfo.split(",")[t].split(":")[1]);
    }
    let average=total/(personInfo.split(":").length-1);

    return{
        average,
    total}
}

function classCondition(Achieve=[]) {
    let classtotal=0;
    let mid;
    let TotalArray=[];
    let k;
    for(let a of Achieve){
       classtotal+=calculatePer(a).total;
       TotalArray.push(calculatePer(a).total);
        }
    let average=classtotal/Achieve.length;

        //冒泡排序；
    for(let i=0;i<TotalArray.length-1;i++){
        for(let j=i+1;j<TotalArray.length;j++){
            if(TotalArray[i]>TotalArray[j])
            {k=TotalArray[i];
            TotalArray[i]=TotalArray[j];
            TotalArray[j]=k;}
        }
    }
    if(Achieve.length%2==1) mid=TotalArray[(Achieve.length-1)/2];
    else mid=(TotalArray[Achieve.length/2-1]+TotalArray[Achieve.length/2])/2;

    return{
    average,
    mid}
}

module.exports={
generateReport};