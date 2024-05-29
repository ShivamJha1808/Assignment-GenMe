const express = require('express');
const app = express();

function isValid(p0,p1,p2)
{
    const constraint1= p0<=p1 && p1<=p2;
    const constraint2 = p0>=0 && p0<=30 && p1>=0 && p1<=30 && p2>=0 && p2<=30;
    const constraint3 = (p0+p1+p2)%2==0;
    return constraint1 && constraint2 && constraint3;
}

function getMaxDraws(p0,p1,p2)
{
    var ans=0;
    while(p0+p1>p2){
        p0--;
        p1--;
        ans++;
    }
    ans+=p0+p1;
    return ans;
}

app.get('/maxDraws/:p0/:p1/:p2',(req,res)=>{
    const {p0,p1,p2} =req.params;
    var maxDraws;
    if(isValid(Number(p0),Number(p1),Number(p2))){
        maxDraws = getMaxDraws(Number(p0),Number(p1),Number(p2));
    }
    else{
        maxDraws = -1;
    }
    
    res.status(200).send({
        max_draws: maxDraws
    });
});

module.exports= {
    isValid,
    getMaxDraws,
    app
}