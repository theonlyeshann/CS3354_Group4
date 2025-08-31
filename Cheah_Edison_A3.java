import java.util.ArrayList;
import java.util.Scanner;

public class Cheah_Edison_A3 {
  public static int findIdxByIsbn(ArrayList<Book> books, int id)  { // Function that searches for book in catalog given its ISBN
    for (int i = 0; i < books.size(); i++)  {
      if (books.get(i).getIsbn() == id)  {
        return i;
      }
    }
    return -1;
  }

  public static int findIdxByDvdCode(ArrayList<Dvd> dvds, int id)  { // Function that searches for DVD in catalog given its DVD code
    for (int i = 0; i < dvds.size(); i++)  {
      if (dvds.get(i).getDvdCode() == id)  {
        return i;
      }
    }
    return -1;
  }

  public static void displayCatalog(ArrayList<Book> books, ArrayList<Dvd> dvds) {
    for (int i = 0; i < books.size(); i++)  {
      System.out.println(books.get(i).toString());
    }

    System.out.println("------------------------------------------------------------------------------------------");

    for (int i = 0; i < dvds.size(); i++)  {
      System.out.println(dvds.get(i).toString());
    }
    System.out.println();
  }

  public static void main(String[] args) {
    ArrayList<Book> bookInventory = new ArrayList<>();
    ArrayList<Dvd> dvdInventory = new ArrayList<>();

    Scanner input = new Scanner(System.in);
    int menuInput;

    do {
      System.out.println("**Welcome to the Comet Books and DVDs Store**\n");
      System.out.println("Choose from the following options:");
      System.out.println("1 - Add Book");
      System.out.println("2 - Add AudioBook");
      System.out.println("3 - Add DVD");
      System.out.println("4 - Remove Book");
      System.out.println("5 - Remove DVD");
      System.out.println("6 - Display Catalog");
      System.out.println("9 - Exit store");
      menuInput = input.nextInt();
      System.out.println();

      switch (menuInput)  {
        case 1:
          int inputBookIsbn;
          String inputBookTitle;
          double inputBookPrice;
          String inputBookAuthor;

          do  {
            System.out.println("Please enter the book ISBN:");
            inputBookIsbn = input.nextInt();
            input.nextLine();

            if (inputBookIsbn < 0) {
              System.out.println("ISBN must be a positive value.");
            }
          } while (inputBookIsbn < 0);

          if (findIdxByIsbn(bookInventory, inputBookIsbn) != -1) { // If the input ISBN matches the ISBN of an existing book in the catalog, return to menu
            System.out.println("There is an existing book with that ISBN.");
            break;
          }

          do  {
            System.out.println("Please enter the book title:");
            inputBookTitle = input.nextLine();

            if (inputBookTitle.length() == 0) {
              System.out.println("Title cannot be left empty.");
            }
          } while (inputBookTitle.length() == 0);

          do  {
            System.out.println("Please enter the book price:");
            inputBookPrice = input.nextDouble();
            input.nextLine();

            if (inputBookPrice < 0) {
              System.out.println("Price must be a positive value.");
            }
          } while (inputBookPrice < 0);

          do  {
            System.out.println("Please enter the book author:");
            inputBookAuthor = input.nextLine();

            if (inputBookAuthor.length() == 0) {
              System.out.println("Author cannot be left empty.");
            }
          } while (inputBookAuthor.length() == 0);

          bookInventory.add(new Book(inputBookTitle, inputBookPrice, inputBookAuthor, inputBookIsbn)); // Add book to catalog
          System.out.println("Book successfully added to catalog.\n");
          break;
        case 2:
          int inputABookIsbn;
          String inputABookTitle;
          double inputABookPrice;
          String inputABookAuthor;
          double inputRuntime;

          do  {
            System.out.println("Please enter the audiobook ISBN:");
            inputABookIsbn = input.nextInt();
            input.nextLine();

            if (inputABookIsbn < 0) {
              System.out.println("ISBN must be a positive value.");
            }
          } while (inputABookIsbn < 0);

          if (findIdxByIsbn(bookInventory, inputABookIsbn) != -1) { // If the input ISBN matches the ISBN of an existing book in the catalog, return to menu
            System.out.println("There is an existing audiobook with that ISBN.");
            break;
          }

          do  {
            System.out.println("Please enter the audiobook title:");
            inputABookTitle = input.nextLine();

            if (inputABookTitle.length() == 0) {
              System.out.println("Title cannot be left empty.");
            }
          } while (inputABookTitle.length() == 0);

          do  {
            System.out.println("Please enter the audiobook price:");
            inputABookPrice = input.nextDouble();
            input.nextLine();

            if (inputABookPrice < 0) {
              System.out.println("Price must be a positive value.");
            }
          } while (inputABookPrice < 0);

          do  {
            System.out.println("Please enter the audiobook author:");
            inputABookAuthor = input.nextLine();

            if (inputABookAuthor.length() == 0) {
              System.out.println("Author cannot be left empty.");
            }
          } while (inputABookAuthor.length() == 0);

          do  {
            System.out.println("Please enter the audiobook runtime:");
            inputRuntime = input.nextDouble();

            if (inputRuntime < 0) {
              System.out.println("Runtime must be a positive value.");
            }
          } while (inputRuntime < 0);

          bookInventory.add(new AudioBook(inputABookTitle, inputABookPrice, inputABookAuthor, inputABookIsbn, inputRuntime)); // Add audiobook to catalog
          System.out.println("Audiobook successfully added to catalog.\n");
          break;
        case 3:
          int inputDvdCode;
          String inputDvdTitle;
          double inputDvdPrice;
          String inputDirector;
          int inputYear;

          do  {
            System.out.println("Please enter the DVD code:");
            inputDvdCode = input.nextInt();
            input.nextLine();

            if (inputDvdCode < 0) {
              System.out.println("DVD code must be a positive value.");
            }
          } while (inputDvdCode < 0);

          if (findIdxByDvdCode(dvdInventory, inputDvdCode) != -1) { // If the input DVD code matches the DVD code of an existing DVD in the catalog, return to menu
            System.out.println("There is an existing DVD with that DVD code.");
            break;
          }

          do  {
            System.out.println("Please enter the DVD title:");
            inputDvdTitle = input.nextLine();

            if (inputDvdTitle.length() == 0) {
              System.out.println("Title cannot be left empty.");
            }
          } while (inputDvdTitle.length() == 0);

          do  {
            System.out.println("Please enter the DVD price:");
            inputDvdPrice = input.nextDouble();
            input.nextLine();

            if (inputDvdPrice < 0) {
              System.out.println("Price must be a positive value.");
            }
          } while (inputDvdPrice < 0);

          do  {
            System.out.println("Please enter the DVD director:");
            inputDirector = input.nextLine();

            if (inputDirector.length() == 0) {
              System.out.println("Director cannot be left empty.");
            }
          } while (inputDirector.length() == 0);

          do  {
            System.out.println("Please enter the DVD year:");
            inputYear = input.nextInt();

            if (inputYear < 0) {
              System.out.println("Year must be a positive value.");
            }
          } while (inputYear < 0);

          dvdInventory.add(new Dvd(inputDvdTitle, inputDvdPrice, inputDirector, inputYear, inputDvdCode)); // Add DVD to catalog
          System.out.println("DVD successfully added to catalog.\n");
          break;
        case 4:
          System.out.println("Please enter the ISBN of the book to remove:");
          int inputRemoveIsbn = input.nextInt();

          if (findIdxByIsbn(bookInventory, inputRemoveIsbn) != -1)  { // If the input ISBN matches the ISBN of an existing book in the catalog, remove it
            bookInventory.remove(findIdxByIsbn(bookInventory, inputRemoveIsbn));
            System.out.println("Book successfully removed. This is your new catalog:");
            displayCatalog(bookInventory, dvdInventory);
            break;
          }
          else  { // Else, return to menu
            System.out.println("No book with the provided ISBN was found.\n");
            break;
          }
        case 5:
          System.out.println("Please enter the DVD code of the DVD to remove:");
          int inputRemoveDvdCode = input.nextInt();

          if (findIdxByDvdCode(dvdInventory, inputRemoveDvdCode) != -1)  { // If the input DVD code matches the DVD code of an existing DVD in the catalog, remove it
            dvdInventory.remove(findIdxByDvdCode(dvdInventory, inputRemoveDvdCode));
            System.out.println("Book successfully removed. This is your new catalog:");
            displayCatalog(bookInventory, dvdInventory);
            break;
          }
          else  { // Else, return to menu
            System.out.println("No DVD with the provided DVD code was found.\n");
            break;
          }
        case 6:
          displayCatalog(bookInventory, dvdInventory);
          break;
        case 9:
          System.exit(0);
        default:
          System.out.println("This option is not acceptable\n");
          break;
      }
    } while (menuInput != 9);
    input.close();
  }
}
