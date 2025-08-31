public class Book extends CatalogItem  { // Book subclass of CatalogItem
  private String author;
  private int isbn;

  Book()  {
  }

  Book(String newName, double newPrice, String newAuthor, int newIsbn)  {
    setName(newName);
    setPrice(newPrice);
    setAuthor(newAuthor);
    setIsbn(newIsbn);
  }

  public String getAuthor() {
    return author;
  }

  public int getIsbn() {
    return isbn;
  }

  public void setAuthor(String newAuthor) {
    author = newAuthor;
  }

  public void setIsbn(int newIsbn) {
    isbn = newIsbn;
  }

  public String toString()  {
    return "Title: " + getName() + " | Author: " + getAuthor() + " | Price: $" + getPrice() + " | ISBN: " + getIsbn();
  }
}
