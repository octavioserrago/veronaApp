package Controllers.Seller;

import java.io.IOException;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;



import Controllers.SceneController;
import Controllers.Common.cotizacionesController;
import Data.Bachas;
import Data.Cotizacion;
import Data.Venta;
import javafx.beans.property.SimpleDoubleProperty;
import javafx.beans.property.SimpleIntegerProperty;
import javafx.beans.property.SimpleStringProperty;
import javafx.collections.FXCollections;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.MenuButton;
import javafx.scene.control.MenuItem;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.layout.AnchorPane;
import javafx.stage.Stage;

public class dashboardSellerController {

    @FXML
    private Button BtnCotizaciones;

    @FXML
    private Button btnBachas;

    @FXML
    private Button btnCaja;

    @FXML
    private Button btnCerrarSesion;

    @FXML
    private Button btnPedidos;

    @FXML
    private MenuItem btnVentas;

    @FXML
    private MenuItem btnVentasBuscar;

    @FXML
    private MenuItem btnVentasModificarEstado;

    @FXML
    private MenuButton btnVentasMenu;

    @FXML
    private Label cotizacionDolarBlue;

    @FXML
    private Label fechaLabel;

    @FXML
    private Label nombreEmpleado;

    @FXML
    private Label fechaUltimaBlue;

    @FXML
    private TableView<Bachas> bachasTablaPreview; 

    @FXML
    private TableView<Venta> tablaVentasResumen;

    @FXML
    void BtnCotizacionesClicked(ActionEvent event) {
        SceneController sceneController = new SceneController((Stage) BtnCotizaciones.getScene().getWindow());
        sceneController.switchToCotizaciones();
    }

    @FXML
    public void initialize() {
        mostrarFechaActual();
        cargarUltimasCotizaciones();
        try {
            cargarVentas();
            cargarBachas();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @FXML
    void btnBachasClicked(ActionEvent event) {
        SceneController sceneController = new SceneController((Stage) btnBachas.getScene().getWindow());
        sceneController.switchToBachas();
    }

    @FXML
    void btnCajaClicked(ActionEvent event) {
        SceneController sceneController = new SceneController((Stage) btnCaja.getScene().getWindow());
        sceneController.switchToCajaSeller();
    }
    @FXML
    void btnVentasModificarEstadoClicked(ActionEvent event){

    }

    @FXML
    void btnCerrarSesionClicked(ActionEvent event) {
        SceneController sceneController = new SceneController((Stage) btnCerrarSesion.getScene().getWindow());
        sceneController.switchToLogin();
    }

    @FXML
    void btnPedidosClicked(ActionEvent event) {

    }
    
    @FXML
    void btnVentasClicked(ActionEvent event) {
        try {
            MenuItem menuItem = (MenuItem) event.getSource();
            MenuButton menuButton = (MenuButton) menuItem.getParentPopup().getOwnerNode();
            Stage stage = (Stage) menuButton.getScene().getWindow();

            FXMLLoader loader = new FXMLLoader(getClass().getResource("/Resources/Views/cargarVentas.fxml"));
            AnchorPane rootPane = loader.load();

            SceneController sceneController = new SceneController(stage);
            sceneController.switchToVentas(rootPane);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    @FXML
    void btnVentasBuscarClicked(ActionEvent event) {
        try {
            MenuItem menuItem = (MenuItem) event.getSource();
            MenuButton menuButton = (MenuButton) menuItem.getParentPopup().getOwnerNode();
            Stage stage = (Stage) menuButton.getScene().getWindow();

            FXMLLoader loader = new FXMLLoader(getClass().getResource("/Resources/Views/buscarVentas.fxml"));
            AnchorPane rootPane = loader.load();

            SceneController sceneController = new SceneController(stage);
            sceneController.switchToVentas(rootPane);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    

    

    private void mostrarFechaActual() {

        LocalDate fechaActual = LocalDate.now();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        String fechaFormateada = fechaActual.format(formatter);

        fechaLabel.setText(fechaFormateada);
    }

    cotizacionesController cotizacionesController = new cotizacionesController();

    private void cargarUltimasCotizaciones() {
        Cotizacion ultimaCotizacionBlue = cotizacionesController.obtenerUltimaCotizacionBlue();

        if (ultimaCotizacionBlue != null) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            String fechaUltimaFormateada = ultimaCotizacionBlue.getFecha().formatted(formatter);

            fechaUltimaBlue.setText(fechaUltimaFormateada);
            cotizacionDolarBlue.setText(String.valueOf(ultimaCotizacionBlue.getTasaCambio()));
        }
    }

    private List<Bachas> obtenerBachasStock() throws SQLException {
        Bachas bachas = new Bachas(0, null, null, 0);
        bachas.setMarcasBachasID(2); 
        return bachas.obtenerBachasStock();
    }

    private void cargarBachas() throws SQLException {
        List<Bachas> listaBachas = obtenerBachasStock();
    
        bachasTablaPreview.getItems().clear();
        bachasTablaPreview.getColumns().clear();
    
        if (listaBachas != null && !listaBachas.isEmpty()) {
    
            TableColumn<Bachas, String> marcasBachasColumn = new TableColumn<>("Marca Bachas");
            TableColumn<Bachas, String> nombreModeloColumn = new TableColumn<>("Nombre Modelo");
            TableColumn<Bachas, String> medidasColumn = new TableColumn<>("Medidas");
            TableColumn<Bachas, Integer> cantidadColumn = new TableColumn<>("Cantidad");
    
            marcasBachasColumn.setCellValueFactory(cellData -> new SimpleStringProperty(obtenerNombreMarcaBachas(cellData.getValue().getMarcasBachasID())));
            nombreModeloColumn.setCellValueFactory(cellData -> new SimpleStringProperty(cellData.getValue().getNombreModelo()));
            medidasColumn.setCellValueFactory(cellData -> new SimpleStringProperty(cellData.getValue().getMedidas()));
            cantidadColumn.setCellValueFactory(cellData -> new SimpleIntegerProperty(cellData.getValue().getCantidad()).asObject());
    
            marcasBachasColumn.setMaxWidth(1f * Integer.MAX_VALUE * 25);
            nombreModeloColumn.setMaxWidth(1f * Integer.MAX_VALUE * 25);
            medidasColumn.setMaxWidth(1f * Integer.MAX_VALUE * 25);
            cantidadColumn.setMaxWidth(1f * Integer.MAX_VALUE * 25);
    
            bachasTablaPreview.setColumnResizePolicy(TableView.CONSTRAINED_RESIZE_POLICY);
    
            List<TableColumn<Bachas, ?>> columnList = Arrays.asList(marcasBachasColumn, nombreModeloColumn, medidasColumn, cantidadColumn);
    
            bachasTablaPreview.getColumns().addAll(columnList);
            bachasTablaPreview.getItems().addAll(listaBachas);
            bachasTablaPreview.setItems(FXCollections.observableList(listaBachas));
        }
    }
    
    private String obtenerNombreMarcaBachas(int marcasBachasID) {
        
        if (marcasBachasID == 2) {
            return "Mi Pileta";
        }
        return "Desconocido";
    }
    
    private List<Venta> obtenerTodasLasVentas() throws SQLException {
        Venta venta = new Venta(0,null, null, null, null, null, 0, 0.0, 0, 0.0, null, null, 0, null, null, null);
        return venta.allVentas();
    }

    
    private void cargarVentas() {
        try {
            List<Venta> listaVentas = obtenerTodasLasVentas();
            tablaVentasResumen.getItems().clear();
            tablaVentasResumen.getColumns().clear();
            if (listaVentas != null && !listaVentas.isEmpty()) {
                TableColumn<Venta, Integer> ventasIDColumn = new TableColumn<>("ID");
                TableColumn<Venta, String> nombreClienteColumn = new TableColumn<>("Nombre Cliente");
                TableColumn<Venta, String> descripcionColumn = new TableColumn<>("Descripción");
                TableColumn<Venta, String> materialColumn = new TableColumn<>("Material");
                TableColumn<Venta, String> colorColumn = new TableColumn<>("Color");
                TableColumn<Venta, String> fechaColumn = new TableColumn<>("Fecha");
                TableColumn<Venta, String> fechaTerminacionColumn = new TableColumn<>("Fecha de Terminacion");
                TableColumn<Venta, String> colocadorColumn = new TableColumn<>("Colocador");
                TableColumn<Venta, Double> precioColocacionColumn = new TableColumn<>("Precio Colocacion");
                TableColumn<Venta, Double> importeColumn = new TableColumn<>("Importe");
                TableColumn<Venta, String> estadoColumn = new TableColumn<>("Estado");
                TableColumn<Venta, Integer> tokenColumn = new TableColumn<>("Token");
                TableColumn<Venta, String> telefono1Column = new TableColumn<>("Telefono");
                TableColumn<Venta, String> telefono2Column = new TableColumn<>("Telefono Secundario");
                TableColumn<Venta, String> emailColumn = new TableColumn<>("Email");
    
                ventasIDColumn.setCellValueFactory(cellData -> new SimpleIntegerProperty(cellData.getValue().getVentasID()).asObject());
                nombreClienteColumn.setCellValueFactory(cellData -> new SimpleStringProperty(cellData.getValue().getNombreCliente()));
                descripcionColumn.setCellValueFactory(cellData -> new SimpleStringProperty(cellData.getValue().getDescripcion()));
                materialColumn.setCellValueFactory(cellData -> new SimpleStringProperty(cellData.getValue().getMaterial()));
                colorColumn.setCellValueFactory(cellData -> new SimpleStringProperty(cellData.getValue().getColor()));
                fechaColumn.setCellValueFactory(cellData -> new SimpleStringProperty(cellData.getValue().getFecha()));
                fechaTerminacionColumn.setCellValueFactory(cellData -> new SimpleStringProperty(cellData.getValue().getFechaEstimadaTerminacion()));
                colocadorColumn.setCellValueFactory(cellData -> new SimpleStringProperty(cellData.getValue().getNombreApellidoColocador()));
                precioColocacionColumn.setCellValueFactory(cellData -> new SimpleDoubleProperty(cellData.getValue().getPrecioColocacion()).asObject());
                importeColumn.setCellValueFactory(cellData -> new SimpleDoubleProperty(cellData.getValue().getImporte()).asObject());
                estadoColumn.setCellValueFactory(cellData -> new SimpleStringProperty(cellData.getValue().getEstado()));
                tokenColumn.setCellValueFactory(cellData -> new SimpleIntegerProperty(cellData.getValue().getToken()).asObject());
                telefono1Column.setCellValueFactory(cellData -> new SimpleStringProperty(cellData.getValue().getTelefono1()));
                telefono2Column.setCellValueFactory(cellData -> new SimpleStringProperty(cellData.getValue().getTelefono2()));
                emailColumn.setCellValueFactory(cellData -> new SimpleStringProperty(cellData.getValue().getEmail()));

                ventasIDColumn.setMaxWidth(1f * Integer.MAX_VALUE * 10);
                nombreClienteColumn.setMaxWidth(1f * Integer.MAX_VALUE * 25);
                descripcionColumn.setMaxWidth(1f * Integer.MAX_VALUE * 50);
                materialColumn.setMaxWidth(1f * Integer.MAX_VALUE * 25);
                colorColumn.setMaxWidth(1f * Integer.MAX_VALUE * 25);
                fechaColumn.setMaxWidth(1f * Integer.MAX_VALUE * 25);
                fechaTerminacionColumn.setMaxWidth(1f * Integer.MAX_VALUE * 25);
                colocadorColumn.setMaxWidth(1f * Integer.MAX_VALUE * 25);
                precioColocacionColumn.setMaxWidth(1f * Integer.MAX_VALUE * 25);
                importeColumn.setMaxWidth(1f * Integer.MAX_VALUE * 25);
                estadoColumn.setMaxWidth(1f * Integer.MAX_VALUE * 25);
                tokenColumn.setMaxWidth(1f * Integer.MAX_VALUE * 10);
                telefono1Column.setMaxWidth(1f * Integer.MAX_VALUE * 25);
                telefono2Column.setMaxWidth(1f * Integer.MAX_VALUE * 25);
                emailColumn.setMaxWidth(1f * Integer.MAX_VALUE * 25);
                
    
                tablaVentasResumen.setColumnResizePolicy(TableView.CONSTRAINED_RESIZE_POLICY);
    
                List<TableColumn<Venta, ?>> columnList = Arrays.asList(ventasIDColumn,nombreClienteColumn, descripcionColumn, materialColumn, colorColumn, fechaColumn,fechaTerminacionColumn, colocadorColumn, precioColocacionColumn,importeColumn, estadoColumn,tokenColumn, telefono1Column, telefono2Column, emailColumn);
    
                tablaVentasResumen.getColumns().addAll(columnList);
                tablaVentasResumen.getItems().addAll(listaVentas);
                tablaVentasResumen.setItems(FXCollections.observableList(listaVentas));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}