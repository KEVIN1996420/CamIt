/* jshint esversion: 9 */

const doWorkPromise = new Promise((resolve, reject) => {
	setTimeout(() => {
	    resolve([7, 4, 1]);
	    // reject('Things went wrong!')
	}, 2000);
    });
    
    doWorkPromise.then((result) => {
	console.log('Success!', result);
    }).catch((error) => {
	console.log('Error!', error);
    });
    
    //
    //                               fulfilled
    //                              /
    // Promise      -- pending --> 
    //                              \
    //                               rejected



    // synchronous example
    // callback1 must be called only one time, after 2 seconds.
    // callback2 must be called three times with an interval of 1 second.

    // function job(callback1, callback2) {
    //     setTimeout(callback1, 2000);
    
    //     let counter = 0;
    
    //     setInterval(function() {
            
    //         counter += 1;
    
    //         if (counter <= 3) {
    //            setTimeout(callback2, 0);
    //         }else{
    //              clearInterval();
    //         }
    //     }, 1000);
    // }
    
    // module.exports = job;