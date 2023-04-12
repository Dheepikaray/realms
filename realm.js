import Realm from "realm";

class Contact extends Realm.Object {}



const BookSchema = {
  name: 'Book',
  properties: {
    title: 'string',
    author: 'string',
    publicationYear: 'int',
  }
};


export default new Realm ({schema:[BookSchema] });

module.exports = Realm;