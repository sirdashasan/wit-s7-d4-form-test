describe("template spec", () => {
  beforeEach(() => {
    //sucunuya bağla
    cy.visit("http://localhost:5173/");
  });

  it("displays error messages for invalid inputs", () => {
    // Ad hatalı girince hata mesajı dönüyor mu?
    cy.get(".cy-name").click().type("ha");
    cy.contains("Name must be at least 3 characters long").should("exist");

    // Soyad hatalı girince hata mesajı dönüyor mu?
    cy.get(".cy-surname").click().type("sı");
    cy.contains("Surname must be at least 3 characters long").should("exist");

    // Hatalı mail girince doğru hata mesajı dönüyor mu?
    cy.get(".cy-email").click().type("hasan");
    cy.contains("Please enter a valid email address").should("exist");

    // Hatalı parola girince doğru hata mesajı dönüyor mu?
    cy.get(".cy-password").click().type("123");
    cy.contains("Password must be at least 4 characters long").should("exist");

    // button disabled mı
    cy.get(".cyBtn").should("be.disabled");
  });

  it("displays error messages for valid inputs", () => {
    // Ad doğru girince hata mesajı dönmeyecek
    cy.get(".cy-name").click().type("hasan");
    cy.contains("Name must be at least 3 characters long").should("not.exist");

    // Soyad doğru girince hata mesajı dönmeyecek
    cy.get(".cy-surname").click().type("sırdaş");
    cy.contains("Surname must be at least 3 characters long").should(
      "not.exist"
    );

    // Doğru mail girince hata mesajı dönmeyecek
    cy.get(".cy-email").click().type("hasan.sirdas@outlook.com");
    cy.contains("Please enter a valid email address").should("not.exist");

    // Doğru parola girince hata mesajı dönmeyecek
    cy.get(".cy-password").click().type("123456789");
    cy.contains("Password must be at least 4 characters long").should(
      "not.exist"
    );

    // Şartları kabul et
    cy.get(".cy-terms").click();

    // button enabled mı
    cy.get(".cyBtn").should("be.enabled");

    // Butona tıkla ve formu gönder
    cy.get(".cyBtn").click();

    //Formu doldurunca id ekrana geliyor mu
    cy.get("h1").should("contain", "ID: ");
  });
});
