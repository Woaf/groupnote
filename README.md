# GroupNote 
GroupNote alkalmazás

## Követelményanalízis
### Követelmények 
Ennek az alakalmazásnak az a lényege, hogy a feliratkozott szamélyek 
bejegyzéseket oszthassanak meg egymás között. A bejegyzések típusát (jellegét, 
témáját) még a bejegyzés felvitele előtt be lehet állítani (pulikus, avagy 
privát bejegyzések).
A bejegyzéseket lehessen törölni. 
A bejegyzések listáját csak azok a személyek tekinthessék meg, akik be vannak 
jelentkezve. 

1. Funkcionális elvárások:
    * Feliratkozás
    * Bejelentkezés
    * Kijelentkezés
    * Bejegyzések felvitele
    * Bejegyzések törlése

2. Nem-funkcionális elvárások:
    * Áttekinthető felület
    * Egyértelmű kezelhetőség

## Használati eset modell
1. Szerepkörök:
    * "Standard" felhasználó
        Ez a felhasználó képes bejegyzéseket létrehozni, és törölni
2.  Használati eset modell
    ![alt text for image](/docs/hasznalati-eset.png "Használati eset diagramm")
3. Folymatok menete
    * Regisztrálás: 
        A regisztáláshoz a "Bejelentkezés" oldalon keresztül lehet eljutni, ami a 
        kezdőoldal jobb felső sarkában található, balra a "Főoldal" gombhoz képest. 
        A "Bejelentkezés" oldalon a felhasználónév és jelszó mezők alatt lévő
        "Regisztrálás" gombra kattintva jutunk el a regisztrációs oldalig. 
        A regisztrálshoz kötelelző jelleggel kell megadni a vezeték és keresztneveket,
        felhasználónevet, illetve választani kell egy jelszót. A jelszó tetzsőleges 
        hosszú lehet. Az adatok helyes kitöltése után a "Regisztrálok" gombra kattintva
        visszakerülünk a bejelentkezés oldalra, ahol az imént regisztrált személy
        készen áll a bejelentkezésre. 
    
    * Bejegyzsés felvitele: 
        A bejelentkezett felhasználóknak lehetősége van új bejegyzések felvitelére is,
        amit a bejegyzések listája alatti "Új bejegyzés" gomb megnyomásásval tehet meg. 
        Egy új bejegyzéshez a felhasználónak meg kell adnia a helyszínt, a bejegyzés
        típusát (a felsorolt 4 közül), illetve a bejegyzés tartalmát. 
        Az adatok megadása után a "Bejegyzés rögzítése" gombbal lehet rögzíteni a 
        bejegyzést. Rögzítéskor az oldal visszairányul a bejegyzések listájának oldalára. 


## Tervezés
###Architektúra terv:
1. Komponens diagramm:
![alt text for image](/docs/komponens.png "Komponens diagramm")
2. Oldaltérkép: 
    * Főoldal
    * Bejelentkezés
    * Regisztráció
    * Bejegyzések listája
    * Új bejegyzés felvitele
3. Végpontok: 
    * "/" (Főoldal) 
    * "/views/login/index" (Bejelentkezés)
    * "/views/login/signup" (Reliratkozás)
    * "/views/posts/list" (Bejegyzések listája)
    * "/views/posts/new" (Új bejegyzés felvitele)

### Felhaszálói felület: 
1. Oldalvázlatok: 
Főoldal
![alt text for image](/docs/index.JPG "Főodal")
Bejelentkezés
![alt text for image](/docs/login.JPG "Bejelentkező oldal")
Feliratozás
![alt text for image](/docs/signup.JPG "Feliratkozás oldal")
Bejegyzések
![alt text for image](/docs/list.JPG "Bejegyzések oldala")
Új bejegyzés
![alt text for image](/docs/new.JPG "Új bejegyzés felvitele")

### Osztálymodell:
1. Adatmodell:
    Ez az alkalmazás két modellt tartalmaz. 
    Az egyik identitás a felhasználók modellje, mely rendelkezik *felhasználónévvel, 
    jelszóval, vezeték-és keresztnévvel, egy avatárral, és egy típussal*. A típus definiálja 
    az adott felhasználó jogosultságait. 
    Ezen kívül egy felhasználó egy-sok kapcsolatban áll egy **posts** bejegyzés kollekcióval. 
    A bejegyzés modellje a következőkből áll: egy bejegyzésnek van *dátuma, státusza, 
    helyisége, és leírása*.
2. Adatbázis terv:  
    Kapcsolat a felahsználók és a beejgyzések között:
    ![alt text for image](/docs/adatbazis.png "Adatbzis terv")

### Implementáció:
1. Fejlesztői környezet bemutatása: 
    Ez a projekt a Cloud9 nevű online fejlesztői környezetben készült (elérhatő a 
    "https://c9.io/" oldalon).
2. Könyvtárstruktúrában levő mappák funkcionalitásai: 
    Ez a webes alkalmazás alapvetően dinamikus weboldal-felhasználó interakció kapcsolatokból épül fel. 
    A megjelenített oldalakat (handlebar fájlokat) *Node.js* fájlok figyelik, és irányítják 
    az elvártnak megfelelően. 
    Az odal átirányításokért a **controllers** mappában elhelyezett *.js* fájlok felelősek. Ezek
    azt figyelik, hogy a felhasználó épp milyen linkre kattintott, illetve milyen adatokat töltott ki
    , és ennek alapján irányítja át őt egy másik oldalra. Az **index.js** megjeleníti a 
    főoldalt. A **login.js** azt figyeli, hogy a bejelentkezéskor megadott adatok helyesek-e, 
    vagyis létezik-e már az adatázisban a megadott személy, illetve helyes-e a megadott
    jelszó. A **post.js** felelős a bejegyzések kilistázásáért, illetve új bejyegyzés 
    felvételekor a mezők ellenőrzéséért, és az adatbázisba való bevitelért. 
    A **config** mappához tartozó **waterline.js** definiálja az adatbáziskapcsolatot.

### Tesztelés 
1. Az alkalmzás helyes működése több szempotnból is tesztelve lett. 
    + A regisztrációnál az *avatar* mezőn kívül minden információ megadása szükséges, 
     egyéb esetben nem veszi fel a felhasználót a program. Helyette kiir egy hibát a képernyőre, hogy 
     további adatok megadására van szükség. 
    + Sikeres regisztráció után csak a helyesen megadott felhasznűlónév és jelszó 
     kombinációval lehet belépni a bejegyzések listájához. Egyéb esetben a program hibát jelez a képernyőn.
    + Egy bejegyzést csak akkor lehet felvinni az adatbázisba, ha a bejegyzés rendelkezik minimum egy karakternyi 
     helyszín illetve leírás információval, illetve a típus a kilistázott 4 típus közül valamelyik. A típus
     elgépelése esetén a program hibaüzenetet küld a képernyőre. 
2. **Zombie.js** tesztfájlok találhatóak a *"/views/test", "/views/login/test", "/models/userTest", és a "/controllers/index.test"* helyeken. 


### Felhasználói dokumentáció: 
1. Az alkalmazás futtatására bármely számítástechnikai eszköz megfelel, amely rendlkezik az alábbi böngészők bármelyikével: 
    + Google Chrome v.26.0 (és későbbi)
    + Microsoft Edge v.12.0 (és későbbi)
    + Internet Explorer v.10.0 (és későbbi)
    + Mozilla Firefox v.16.0 (és későbbi)
    + Safari v.6.1 (és későbbi)
    + Opera v.12.1 (és későbbi)

2. Telepítés lépései: 
    A GroupNote GITHub oldaláról (*https://github.com/Woaf/groupnote*) le kell tölteni a projektet,
    majd elindítani egy szervert ami futtatja a **server.js** állományt. Az alkalmazás helyes működéséhez 
    minden mappára szükség van. 

3. Az alakalmazás elindítása után a program ugyan úgy használható, mint bármely más 
    webes alkalmazás. A szervernek **szükséges** futtatnia a server.js állományt ahhoz, hogy
    a program elérhető legyen. 