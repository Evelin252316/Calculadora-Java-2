public class CalculadoraTest {
    public static void main(String[] args) {
        assert Calculadora.sumar(2, 3) == 5 : "Error en suma";
        assert Calculadora.restar(5, 3) == 2 : "Error en resta";
        assert Calculadora.multiplicar(2, 4) == 8 : "Error en multiplicación";
        assert Calculadora.dividir(10, 2) == 5 : "Error en división";
        System.out.println("Todas las pruebas pasaron correctamente.");
    }
}
