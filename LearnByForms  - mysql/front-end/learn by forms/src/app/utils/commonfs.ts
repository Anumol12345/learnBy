export function buildReqJson(
    id: String,
    inp0: any,
    // inp1: any,
    // inp2: any,
    // inp3: any,
  ): any {
    var reqObjs = new Object();
    var inpObjs = new Array();
    let session;
    let userid;
    if (localStorage.getItem('session.key')) {
      console.log(localStorage.getItem('session.key'));
      session = JSON.parse(localStorage.getItem('session.key') || '');
    } else {
      session = '';
    }
    if (localStorage.getItem('session.key')) {
      console.log(localStorage.getItem('session.userid'));
      userid = JSON.parse(localStorage.getItem('session.userid') || '');
    } else {
      userid = '';
    }
  
    if (inp0 != null) {
      inpObjs[0] = inp0;
    }
    // if (inp1 != null) {
    //   inpObjs[1] = inp1;
    // }
    // if (inp2 != null) {
    //   inpObjs[2] = inp2;
    // }
    // if (inp3 != null) {
    //   inpObjs[3] = inp3;
    // }
    reqObjs = {
      id: id,
      userid: userid || '',
      sessionKey: session || '',
      inputObjs: JSON.stringify(inpObjs, replacer),
    };
    return reqObjs;
  }
  
  function replacer(key: any, value: any) {
    if (typeof value === 'boolean') {
      return String(value);
    }
    return value;
  }

  