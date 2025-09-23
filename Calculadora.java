// Calculadora.java


/**
 * Clase Calculadora: métodos independientes para operaciones básicas.
 * Cada método es estático y puro (sin efectos secundarios) para facilitar pruebas.
 */
public class Calculadora {

    /**
     * Suma dos números (double).
     * @param a primer sumando
     * @param b segundo sumando
     * @return resultado de a + b
     */
    public static double suma(double a, double b) {
        return a + b;
    }

    /**
     * Resta b de a.
     * @param a minuendo
     * @param b sustraendo
     * @return resultado de a - b
     */
    public static double resta(double a, double b) {
        return a - b;
    }

    /**
     * Multiplica dos números.
     * @param a factor 1
     * @param b factor 2
     * @return resultado de a * b
     */
    public static double multiplicacion(double a, double b) {
        return a * b;
    }

    /**
     * Divide a entre b.
     * Lanza ArithmeticException si b == 0.
     * @param a dividendo
     * @param b divisor
     * @return resultado de a / b
     * @throws ArithmeticException si b == 0
     */
    public static double division(double a, double b) {
        if (b == 0.0) {
            throw new ArithmeticException("División por cero no permitida");
        }
        return a / b;
    }

    /**
     * Metodo main para pruebas rápidas.
     */
    public static void main(String[] args) {
        double a = 12.5;
        double b = 2.5;

        System.out.println("Pruebas rápidas de Calculadora:");
        System.out.printf("suma(%.3f, %.3f) = %.3f%n", a, b, suma(a,b));
        System.out.printf("resta(%.3f, %.3f) = %.3f%n", a, b, resta(a,b));
        System.out.printf("multiplicacion(%.3f, %.3f) = %.3f%n", a, b, multiplicacion(a,b));
        System.out.printf("division(%.3f, %.3f) = %.3f%n", a, b, division(a,b));

        // Manejo de división por cero (ejemplo)
        try {
            System.out.println("Intentando división por 0...");
            division(5.0, 0.0);
        } catch (ArithmeticException ex) {
            System.out.println("Capturada excepción: " + ex.getMessage());
        }
    }
}
