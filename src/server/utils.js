const utils = {
  storeMD5(data) {
    return data;
  },

  storeSyscall(data) {
    return data;
  },

  storePcap(data) {
    // console.log(data);
    const resultForPcap = data.toString().split('0x0000');
    return resultForPcap[0];
  },

  storeData(task, data) {
    let response = null;
    if (task.toString() == '1') {
      response = this.storeMD5(data);
    } else if (task.toString() == '2') {
      response = this.storePcap(data);
    } else if (task.toString() == '3') {
      response = this.storeSyscall(data);
    }
    return response;
  },

  addClient(L, c) {
    for (let i = 0; i < L.length; i++) {
      tmp = L[i];
      if (tmp.ip == c.ip) {
        L.splice(i, 1);
        break;
      }
    }
    L.push(c);
    return L;
  },

  getTask(L, sName) {
    for (let i = 0; i < L.length; i++) {
      if (L[i].address == sName) {
        return L[i].currentTask;
      }
    }
    return null;
  },
};

module.exports = utils;
