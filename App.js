import React, {useState} from 'react';
import {View, Text, TextInput, Button, FlatList, StyleSheet} from 'react-native';
import Realm from 'realm';

const BookSchema = {
  name: 'Book',
  properties: {
    title: 'string',
    author: 'string',
    publicationYear: 'int',
  },
};

const realm = new Realm({schema: [BookSchema]});

const App = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publicationYear, setPublicationYear] = useState('');
  const [books, setBooks] = useState([]);

  const addBook = () => {
    realm.write(() => {
      const book = realm.create('Book', {
        title: title,
        author: author,
        publicationYear: parseInt(publicationYear),
      });
      setBooks([...books, book]);
      setTitle('');
      setAuthor('');
      setPublicationYear('');
    });
  };

  const deleteBook = (book) => {
    realm.write(() => {
      realm.delete(book);
      const updatedBooks = books.filter((b) => b !== book);
      setBooks(updatedBooks);
    });
  };

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.author}>{item.author}</Text>
      <Text style={styles.publicationYear}>{item.publicationYear}</Text>
      <Button title="Delete" onPress={() => deleteBook(item)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Author"
          value={author}
          onChangeText={(text) => setAuthor(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Publication Year"
          value={publicationYear}
          onChangeText={(text) => setPublicationYear(text)}
          keyboardType="numeric"
        />
        <Button title="Add" onPress={addBook} />
      </View>
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginRight: 10,
  },
  list: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  author: {
    flex: 1,
    fontSize: 14,
  },
  publicationYear: {
    flex: 1,
    fontSize: 14,
    textAlign: 'right',
  },
});

export default App;
