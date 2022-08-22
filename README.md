# Simple todo app example using layered architecture

As usual, in the project directory, you can run:

### `npm start`

and open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Also you could run:
### `npm test`

To run couple of example interface tests.

Couple of thoughts regarding this small project

- The backend service for this example is done beautifully and well documented, but has a serious drawback - it works wrong. On updating, deleting and adding item, it returns the same list of 200 items. If not this working manner, code could be cut to the half. Instead of layered architecture and application level hooks, one could simply use refetch() feature of apollo client and be fine. 
- To keep working, I've decided to try to decouple todo logic and state management from ui, and pass all management functions to a common context. Also, to provide means of getting single todo by todo id, passed into route, I could, possibly, use backend request and be fine without context at all. 
