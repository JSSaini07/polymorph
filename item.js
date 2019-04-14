function _item() {
  this.title = "";
  this.toSaveData = function () {
    return JSON.parse(JSON.stringify(this)); //remove all methods and return the object.
  };
  this.fromSaveData = function (item) {
    Object.assign(this, item);
    // do some upgrading lol
    if (this.httree) {
      this.links = {};
      Object.assign(this.links, this.httree);
    }
  };
}

/*
Standards
title: Must be a plaintext string
links: Links. Various types of standard links:
{
    parent
    children
    previous
    next
}

*/