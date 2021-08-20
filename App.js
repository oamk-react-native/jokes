import React,{useState,useEffect} from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Button } from 'react-native';

const URL = 'https://official-joke-api.appspot.com/random_joke';

export default function App() {
  const [setup,setSetup] = useState('');
  const [punchline, setPunchline] = useState('');
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getJoke();
  }, [])


  function getJoke() {
    setIsloading(true);
    fetch(URL)
    .then(res => res.json())
    .then((result) => {
      setSetup(result.setup);
      setPunchline(result.punchline);
      setIsloading(false);
      setError(null);
    }, (error) => {
      console.log(error);
      setError("Error retrieving a joke");
      setIsloading(false);
    })
  }


  if (isLoading) {
    return (<View style={styles.container}><ActivityIndicator size="large" /></View>);
  } else if (error) {
    return (<View style={styles.container}><Text style={styles.text}>{error}</Text></View>);
  }
  else {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{setup}</Text>
        <Text style={styles.text}>{punchline}</Text>
        <Button title="Get another joke" onPress={getJoke}/>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  text: {
    marginBottom: 20,
    fontSize: 20,
    alignSelf: 'stretch',
    textAlign: 'left',
  }
});
