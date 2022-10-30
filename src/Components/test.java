
/**
 * Write a description of class RandomRectangles here.
 *
 * @author Arthur Roth
 * @version 10/19/2022
 */
import java.util.Random; 
import java.util.Scanner;
public class RandomRectangles
{
    public static final int MAX_X = 100; 
    public static final int MAX_Y = 500; 
    public static final int MIN_WIDTH = 30;   
    public static final int MAX_WIDTH = 100;    
    public static final int MIN_HEIGHT = 20; 
    public static final int MAX_HEIGHT = 80;    
     
    public static final int GENERATOR_SEED = 202210;
    public static void main(String[] args) 
    {
        Scanner in = new Scanner(System.in);
        Random random = new Random(GENERATOR_SEED);
        System.out.print("Enter a positive number for the number of rectangles: ");
        
        int smallestArea = MAX_HEIGHT * MAX_WIDTH; 
        Rectangle tinyRectangle = new Rectangle();
        
        int count = -1;
        
        while (count <= 0) 
        {  
            if (!in.hasNextInt()) 
            {
                String notInt = in.nextLine();
                System.out.print("Not an integer: " + '\"' + notInt + '\"' + ".");
            } 

            else if (count <= 0) 
            { 
                System.out.print("Not positive: " + count + "."); 
                count = in.nextInt(); 
            }
        }
        
        
        for (int i = 0; i < count; i++) 
        { 
            int randomX = random.nextInt(MAX_X); 
            int randomY = random.nextInt(MAX_Y);
            int randomWidth = random.nextInt(MAX_WIDTH - MIN_WIDTH) + MIN_WIDTH;
            int randomHeight = random.nextInt(MAX_HEIGHT - MIN_HEIGHT) + MIN_HEIGHT; 
            int currentArea = randomWidth * randomHeight; 
            Rectangle rect = new Rectangle(randomX, randomY, randomWidth, randomHeight);
            
            if (currentArea <= smallestArea) 
            {
                smallestArea = currentArea;
                tinyRectangle = rect;
            }
            

            rect.setColor(Color.RED); 
            rect.draw();
            
        }
        
        tinyRectangle.setColor(Color.YELLOW);
        tinyRectangle.fill();
        
        // message 
        System.out.println("The number of rectangles: " + count + ".");
        System.out.println("The min area: " + smallestArea + ".");
    }
        
}

