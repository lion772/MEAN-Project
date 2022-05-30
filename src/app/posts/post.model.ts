//It is like a class that defines how an object looks like, but it can't
//be instantiated, it's more like a contract. We can use it to create our
//own type, to force a certain object to look like sth.

export interface Post {
  id: string;
  title: string;
  content: string;
}
