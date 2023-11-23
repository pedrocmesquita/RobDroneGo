export class Mazes {
  public getMazeData(): Promise<any> {
    return fetch('http://localhost:4000/api/floors/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }
}