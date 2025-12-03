import { ComponentFixture, TestBed } from "@angular/core/testing"
import { UnittestComponent } from "./unittest.component"
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { ProductService } from "../services/product.service";
import { of } from "rxjs";
import { provideHttpClient } from "@angular/common/http";


describe('Test UnitTest Component', () => {

  let fixture: ComponentFixture<UnittestComponent>;
  let component: UnittestComponent;
  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [UnittestComponent],
      providers: [provideHttpClient()]
    }).compileComponents();

    fixture = TestBed.createComponent(UnittestComponent);
    component = fixture.componentInstance;

  })

  it('Pass num1>0, num2>0 return total>0', () => {
    //Arrangement
    component.num1 = 10;
    component.num2 = 20;

    //Act
    component.addition();

    //Assert
    expect(component.total).toEqual(30); //matchers = toEqual(), toBeNull()
  })

  it('Pass num1<0, num2<0 return total<0', () => {
    //Arrangement
    component.num1 = -10;
    component.num2 = -20;

    //Act
    component.addition();

    //Assert
    expect(component.total).toEqual(-30); //matchers = toEqual(), toBeNull()
  })

  it('Pass num1>0, num2>0 return h4 tag with result', () => {
    //Arrangement
    let de: DebugElement = fixture.debugElement.query(By.css('h4.cls'));
    let ele: HTMLElement = de.nativeElement;
    component.num1 = 1;
    component.num2 = 3;

    //Act
    component.addition();
    fixture.detectChanges();

    //Assert
    expect(ele.textContent).toEqual("Result: 4");
  })

  it('Test loadProduct method', () => {
    //Arrangement
    let productService = fixture.debugElement.injector.get(ProductService);
    let dataStub = of([
      { productId: 101, productName: 'test', productCode: 'p01', active: true, price: 123 }
      , { productId: 2, productName: 'test2', productCode: 'p02', active: true, price: 333 }
    ]);

    spyOn(productService, 'getProducts').and.returnValue(dataStub);

    //Act
    component.loadProducts();

    //Assert
    expect(component.products.length).toEqual(2);
    expect(component.products[0].productId).toEqual(101);
    expect(component.num1).toEqual(101); 

  })

  it('form validation for valid case', ()=>{
    //Arrangement
    component.frm.controls['customerId'].setValue(1);
    component.frm.controls['customerName'].setValue('test');

    //Assert
    expect(component.frm.valid).toBeTruthy();
  })

   it('form validation for invalid case', ()=>{
    //Arrangement
    component.frm.controls['customerId'].setValue(1);
    component.frm.controls['customerName'].setValue('');

    //Assert
    expect(component.frm.valid).toBeFalsy();
  })

  it('should trigger saveCustomer method is called on click', ()=> {
    spyOn(component, 'saveCustomer');
    fixture.detectChanges();
    let de: DebugElement = fixture.debugElement.query(By.css('input[type=submit]'));
    let ele: HTMLElement = de.nativeElement;
    ele.click();

    expect(component.saveCustomer).toHaveBeenCalledTimes(1);
  })


  afterEach(() => {

  })


})