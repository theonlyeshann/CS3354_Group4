public class AudioBook extends Book { // AudioBook subclass of Book
  private double runningTime;

  AudioBook()  {
  }

  AudioBook(String newName, double newPrice, String newAuthor, int newIsbn, double newRunTime)  {
    setName(newName);
    setPrice(newPrice);
    setAuthor(newAuthor);
    setIsbn(newIsbn);
    setRunningTime(newRunTime);
  }

  public double getPrice()  {
    return super.getPrice()*0.9;
  }
  public double getRunningTime()  {
    return runningTime;
  }

  public void setRunningTime(double newRunTime) {
    runningTime = newRunTime;
  }

  public String toString()  {
    return "Title: " + getName() + " | Author: " + getAuthor() + " | Price: $" + getPrice() + " | ISBN: " + getIsbn() + " | RunningTime: " + getRunningTime();
  }
}
