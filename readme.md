# Zadanie rekrutacyjne My Music
### Treść zadania:
Proszę napisać w formularz dodawania kontrahenta który zawiera:
    
    a) Imię
    b) Nazwisko
    c) Typ ( Osoba lub Firma)
    d) Numer identyfikacyjny ( jeśli osoba to Pesel lub jeśli firma to NIP)
    e) Zdjęcie ( Podgląd ma wyświetlić po wybraniu pliku z dysku)

Formularz ma walidować dane Numeru identyfikacyjnego:

    - Czy wprowadzono poprawny PESEL/ NIP

Zdjęcie:

    Format JPG/JPEG
    Acpect ratio 1:1 (zdjęcie w kwadracie)

Dodatkowo Submit Forma ma wykonać na końcówkę  https://localhost:60001/Contractor/Save   i być jako POST Oczywiście ta końcówka zwróci kod błędu 404 i ma się wyświetlić komunikat użytkownikowi "Nie znaleziono metody zapisu"