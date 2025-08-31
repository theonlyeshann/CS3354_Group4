public abstract class CatalogItem { // Abstract parent class for catalog items
  private String name;
  private double price = 0;

  CatalogItem()  {
  }

  public String getName()  {
    return name;
  }

  public double getPrice()  {
    return price;
  }

  public void setName(String newName)  {
    name = newName;
  }

  public void setPrice(double newPrice)  {
    price = newPrice;
  }
}
