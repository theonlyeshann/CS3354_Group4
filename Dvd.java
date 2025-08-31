public class Dvd extends CatalogItem  { // DVD subclass of CatalogItem
  private String director;
  private int year;
  private int dvdCode;

  Dvd()  {
  }

  Dvd(String newName, double newPrice, String newDirector, int newYear, int newDvdCode)  {
    setName(newName);
    setPrice(newPrice);
    setDirector(newDirector);
    setYear(newYear);
    setDvdCode(newDvdCode);
  }

  public String getDirector() {
    return director;
  }

  public int getYear() {
    return year;
  }

  public int getDvdCode() {
    return dvdCode;
  }

  public void setDirector(String newDirector) {
    director = newDirector;
  }

  public void setYear(int newYear) {
    year = newYear;
  }

  public void setDvdCode(int newDvdCode) {
    dvdCode = newDvdCode;
  }

  public String toString()  {
    return "Title: " + getName() + " | Director: " + getDirector() + " | Price: $" + getPrice() + " | Year: " + getYear() + " | DvdCode: " + getDvdCode();
  }
}
