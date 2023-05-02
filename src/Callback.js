function hr(){
    return new Promise(function(resolve,reject){

        setTimeout(function(){
            if(tech=='JAVA'){
                reject()
            }else if(tech == "REACT"){
                resolve()
            }
        },3000)

    })
}


hr().then(function(){},function(){})