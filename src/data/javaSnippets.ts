import { CodeVersion, TestCase } from '../types';

export const BASE_FARE = 10.0;
export const PER_KM_FARE = 2.20;
export const MIN_FARE = 20.0;

export function calculateFare(km: number) {
  const safeKm = Math.max(0, km);
  const rawFare = BASE_FARE + (safeKm * PER_KM_FARE);
  const isMinFareApplied = rawFare < MIN_FARE;
  const finalFare = isMinFareApplied ? MIN_FARE : rawFare;

  return {
    km: safeKm,
    baseFare: BASE_FARE,
    perKmFare: PER_KM_FARE,
    rawFare: Number(rawFare.toFixed(2)),
    minFare: MIN_FARE,
    finalFare: Number(finalFare.toFixed(2)),
    isMinFareApplied,
  };
}

export const TEST_CASES: TestCase[] = [
  {
    id: 'test-1',
    km: 0,
    expectedRaw: 10.00,
    expectedFinal: 20.00,
    minFareApplied: true,
    scenario: 'Hareketsiz / 0 KM (Açılışta inen yolcu - İndi-Bindi)',
  },
  {
    id: 'test-2',
    km: 2,
    expectedRaw: 14.40,
    expectedFinal: 20.00,
    minFareApplied: true,
    scenario: '2 KM Kısa Mesafe (10 + 4.4 = 14.4 TL < 20 TL)',
  },
  {
    id: 'test-3',
    km: 4.545,
    expectedRaw: 20.00,
    expectedFinal: 20.00,
    minFareApplied: false,
    scenario: 'Kritik Eşik Noktası (10 + 4.545 × 2.20 = 20.00 TL)',
  },
  {
    id: 'test-4',
    km: 5,
    expectedRaw: 21.00,
    expectedFinal: 21.00,
    minFareApplied: false,
    scenario: '5 KM Şehir İçi Yolculuk (10 + 11.0 = 21.00 TL)',
  },
  {
    id: 'test-5',
    km: 10,
    expectedRaw: 32.00,
    expectedFinal: 32.00,
    minFareApplied: false,
    scenario: '10 KM Orta Mesafe (10 + 22.0 = 32.00 TL)',
  },
  {
    id: 'test-6',
    km: 25,
    expectedRaw: 65.00,
    expectedFinal: 65.00,
    minFareApplied: false,
    scenario: '25 KM Havalimanı / Uzun Yolculuk (10 + 55.0 = 65.00 TL)',
  },
];

export const JAVA_CODE_VERSIONS: CodeVersion[] = [
  {
    id: 'standard',
    title: 'Standart Çözüm (Ternary Operatörü)',
    description: 'Ödev şartnamesine en uygun, tek satırda ternary operatörü (? :) kullanan klasik çözüm.',
    filename: 'Taksimetre.java',
    code: `import java.util.Scanner;

/**
 * =========================================================
 * TAKSİMETRE PROGRAMI
 * Geliştirici / Öğrenci: Ene Öztürk
 * Konu: Java Temel Değişkenler ve Koşullu İfadeler Ödevi
 * 
 * Şartlar:
 * 1. Taksimetre KM başına 2.20 TL tutmaktadır.
 * 2. Taksimetre açılış ücreti 10 TL'dir.
 * 3. Minimum ödenecek tutar 20 TL'dir. 20 TL altındaki ücretlerde
 *    yine 20 TL tahsil edilir.
 * =========================================================
 */
public class Taksimetre {
    public static void main(String[] args) {
        // Değişkenlerin tanımlanması
        double km;
        double perKm = 2.20;    // KM başı ücret
        double total = 10.0;    // Başlangıç açılış ücreti
        double minFee = 20.0;   // Minimum ödenecek indi-bindi tutarı

        // Kullanıcıdan mesafe bilgisini almak için Scanner oluşturulması
        Scanner scanner = new Scanner(System.in);

        System.out.println("================================================");
        System.out.println("      TAKSİMETRE PROGRAMI - ENE ÖZTÜRK         ");
        System.out.println("================================================");
        System.out.print("Lütfen gidilen mesafeyi (KM cinsinden) giriniz: ");
        
        km = scanner.nextDouble();

        // Gidilen mesafeye göre tutar hesaplaması
        // Formül: Toplam = Açılış Ücreti + (KM * KM Başına Ücret)
        total += (km * perKm);

        // Minimum tutar kontrolü (Ternary / Üçlü Şart Operatörü ile)
        // Eğer toplam 20 TL'den az ise 20 TL, değilse hesaplanan tutar geçerlidir.
        total = (total < minFee) ? minFee : total;

        // Sonucun kullanıcıya formatlı şekilde yazdırılması
        System.out.println("------------------------------------------------");
        System.out.printf("Toplam Ödenecek Taksimetre Tutarı: %.2f TL%n", total);
        System.out.println("================================================");
        System.out.println("İyi yolculuklar dileriz! (Hazırlayan: Ene Öztürk)");

        // Kaynak sızıntısını önlemek için scanner kapatılır
        scanner.close();
    }
}`,
  },
  {
    id: 'ifelse',
    title: 'Alternatif Çözüm (if - else Yapısı)',
    description: 'Koşul yapısının mantığını adım adım gösteren if-else bloklu alternatif yöntem.',
    filename: 'TaksimetreIfElse.java',
    code: `import java.util.Scanner;

/**
 * Taksimetre Programı - if/else Versiyonu
 * Geliştirici: Ene Öztürk
 */
public class TaksimetreIfElse {
    public static void main(String[] args) {
        // Sabit tanımlamaları
        final double ACILIS_UCRETI = 10.0;
        final double KM_BASINA_UCRET = 2.20;
        final double MINIMUM_TUTAR = 20.0;

        Scanner input = new Scanner(System.in);

        System.out.println("--- TAKSİMETRE HESAPLAMA SİSTEMİ (Ene Öztürk) ---");
        System.out.print("Gidilen Mesafeyi (KM) Giriniz: ");
        double mesafe = input.nextDouble();

        // Mesafenin negatif girilme ihtimaline karşı doğrulama
        if (mesafe < 0) {
            System.out.println("Hata: Mesafe 0'dan küçük olamaz!");
            input.close();
            return;
        }

        // Ham tutarın hesaplanması
        double hesaplananTutar = ACILIS_UCRETI + (mesafe * KM_BASINA_UCRET);
        double odenecekTutar;

        // if-else ile minimum ücret kontrolü
        if (hesaplananTutar < MINIMUM_TUTAR) {
            odenecekTutar = MINIMUM_TUTAR;
            System.out.println("Bilgi: Hesaplanan tutar (" + String.format("%.2f", hesaplananTutar) + " TL) taban ücretin altında kaldığından 20.00 TL uygulandı.");
        } else {
            odenecekTutar = hesaplananTutar;
        }

        System.out.println("--------------------------------------------------");
        System.out.println("Açılış Ücreti     : " + ACILIS_UCRETI + " TL");
        System.out.println("Mesafe Ücreti     : " + String.format("%.2f", (mesafe * KM_BASINA_UCRET)) + " TL (" + mesafe + " KM x " + KM_BASINA_UCRET + " TL)");
        System.out.println("Ödenecek Tutar    : " + String.format("%.2f", odenecekTutar) + " TL");
        System.out.println("--------------------------------------------------");

        input.close();
    }
}`,
  },
  {
    id: 'oop',
    title: 'Nesne Yönelimli Çözüm (OOP Class)',
    description: 'Gerçek dünya modellemesi içeren modüler Taksimetre sınıfı ve metot yapısı.',
    filename: 'TaksimetreOOP.java',
    code: `import java.util.Scanner;

/**
 * Nesne Yönelimli Programlama (OOP) Prensipleri ile Taksimetre
 * Geliştirici: Ene Öztürk
 */
class TaksimetreHesaplayici {
    private static final double ACILIS_UCRETI = 10.0;
    private static final double KM_TARIFESI = 2.20;
    private static final double TABAN_UCRET = 20.0;

    private double mesafeKm;

    public TaksimetreHesaplayici(double mesafeKm) {
        this.mesafeKm = Math.max(0, mesafeKm);
    }

    public double getMesafeKm() {
        return mesafeKm;
    }

    public double hesaplaHamTutar() {
        return ACILIS_UCRETI + (mesafeKm * KM_TARIFESI);
    }

    public double hesaplaOdenecekTutar() {
        double hamTutar = hesaplaHamTutar();
        return Math.max(hamTutar, TABAN_UCRET);
    }

    public void fisYazdir() {
        System.out.println("==========================================");
        System.out.println("         TAKSİ YOLCULUK FİŞİ              ");
        System.out.println("     Geliştirici: Ene Öztürk              ");
        System.out.println("==========================================");
        System.out.printf("Açılış Ücreti     : %10.2f TL%n", ACILIS_UCRETI);
        System.out.printf("Gidilen Mesafe    : %10.2f KM%n", mesafeKm);
        System.out.printf("KM Birim Fiyatı   : %10.2f TL%n", KM_TARIFESI);
        System.out.printf("Mesafe Tutarı     : %10.2f TL%n", (mesafeKm * KM_TARIFESI));
        System.out.printf("Ham Toplam Tutar  : %10.2f TL%n", hesaplaHamTutar());
        System.out.println("------------------------------------------");
        System.out.printf("ÖDENECEK TUTAR    : %10.2f TL%n", hesaplaOdenecekTutar());
        System.out.println("==========================================");
    }
}

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Gidilen Mesafeyi Giriniz (KM): ");
        double km = scanner.nextDouble();

        TaksimetreHesaplayici taksimetre = new TaksimetreHesaplayici(km);
        taksimetre.fisYazdir();

        scanner.close();
    }
}`,
  },
];
