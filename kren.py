# Excel'e birebir uyumlu sonuçları tkinter GUI'ye entegre edelim
import tkinter as tk
from tkinter import messagebox

# Girdi alanları için global değişkenler
input_fields = {}

def hesapla_gui():
    try:
        # Kullanıcı girdilerini al ve float'a dönüştür
        Lc = float(input_fields['Lc'].get())
        ah = float(input_fields['ah'].get())
        aw = float(input_fields['aw'].get())
        wc = float(input_fields['wc'].get())
        wcb = float(input_fields['wcb'].get())
        wcap = float(input_fields['wcap'].get())
        L = float(input_fields['L'].get())
        
        # Hesaplamalar
        RA = (wc / 2) + ((Lc - ah) / Lc) * (wcb + wcap)
        RB = wc + wcb + wcap - RA
        WvA = RA / 2
        WvB = RB / 2
        WvA_t = WvA * 1.25
        WvB_t = WvB * 1.25
        Wh1 = 0.025 * (wcb + wcap)
        Wh2A = 0.05 * WvA
        Wh2B = 0.05 * WvB_t

        QMaxA = WvA_t * (2 - aw / L)
        QMaxB = WvB_t * (2 - aw / L)

        M1 = QMaxA * 2 / L * ((L / 2 - aw / 4) ** 2)
        M2 = QMaxA * L / 4
        MMajor3max = max(M1, M2)
        V3Majormax = Wh2A * (2 - aw / L)

        MMinor1 = 2 * Wh2A / L * ((L / 2 - aw / 4) ** 2)
        MMinor2 = Wh2A * L / 4
        MMinor2max = max(MMinor1, MMinor2)

        # Sonuçları arayüzde göster
        results = (
            f"RA = {RA:.2f} kN\nRB = {RB:.2f} kN\n"
            f"W'vA = {WvA_t:.2f} kN\nW'vB = {WvB_t:.2f} kN\n"
            f"Wh1 = {Wh1:.2f} kN\nWh2A = {Wh2A:.2f} kN\nWh2B = {Wh2B:.2f} kN\n"
            f"QMaxA = {QMaxA:.2f} kN\nQMaxB = {QMaxB:.2f} kN\n"
            f"M1 = {M1:.2f} kNm\nM2 = {M2:.2f} kNm\n"
            f"MMajor3max = {MMajor3max:.2f} kNm\n"
            f"V3Majormax = {V3Majormax:.2f} kN\n"
            f"MMinor1 = {MMinor1:.2f} kNm\nMMinor2 = {MMinor2:.2f} kNm\n"
            f"MMinor2max = {MMinor2max:.2f} kNm"
        )
        result_label.config(text=results)
    except ValueError:
        messagebox.showerror("Hata", "Lütfen tüm alanlara sayısal değerler girin.")
    except Exception as e:
        messagebox.showerror("Hata", f"Hesaplamada bir hata oluştu: {e}")

def create_input_field(frame, row, label_text, default_value):
    # Etiket oluştur
    tk.Label(frame, text=label_text).grid(row=row, column=0, sticky=tk.W, padx=5, pady=2)
    
    # Girdi alanı oluştur
    entry = tk.Entry(frame, width=10)
    entry.grid(row=row, column=1, padx=5, pady=2)
    entry.insert(0, str(default_value))
    
    # Global sözlüğe kaydet
    input_fields[label_text] = entry
    
    return entry

def default_values():
    # Varsayılan değerleri girdi alanlarına yerleştir
    defaults = {
        'Lc': 33.0,
        'ah': 0.8,
        'aw': 1.56,
        'wc': 380.0,
        'wcb': 50.0,
        'wcap': 200.0,
        'L': 12.0
    }
    
    for key, value in defaults.items():
        if key in input_fields:
            input_fields[key].delete(0, tk.END)
            input_fields[key].insert(0, str(value))

# Ana GUI
root = tk.Tk()
root.title("KASCCO 20t Vinç Hesabı (Excel Uyumlu)")

# Ana çerçeve
main_frame = tk.Frame(root, padx=10, pady=10)
main_frame.pack(fill=tk.BOTH, expand=True)

# Giriş bölümü
input_frame = tk.Frame(main_frame, bd=2, relief=tk.GROOVE)
input_frame.pack(fill=tk.X, padx=5, pady=5)

tk.Label(input_frame, text="Parametreleri Girin:", font=("Arial", 10, "bold")).grid(row=0, column=0, columnspan=2, sticky=tk.W, padx=5, pady=5)

# Girdi alanları
create_input_field(input_frame, 1, 'Lc', 33.0)
create_input_field(input_frame, 2, 'ah', 0.8)
create_input_field(input_frame, 3, 'aw', 1.56)
create_input_field(input_frame, 4, 'wc', 380.0)
create_input_field(input_frame, 5, 'wcb', 50.0)
create_input_field(input_frame, 6, 'wcap', 200.0)
create_input_field(input_frame, 7, 'L', 12.0)

# Parametre açıklamaları
descriptions_frame = tk.Frame(main_frame)
descriptions_frame.pack(fill=tk.X, padx=5, pady=5)

tk.Label(descriptions_frame, text="Parametre Açıklamaları:", font=("Arial", 10, "bold")).pack(anchor=tk.W)
tk.Label(descriptions_frame, text="Lc: Kren uzunluğu (m)\nah: Kanca mesafesi (m)\naw: Tekerler arası mesafe (m)\nwc: Kren ağırlığı (kN)\nwcb: Kren köprü ağırlığı (kN)\nwcap: Kren taşıma kapasitesi (kN)\nL: Ray uzunluğu (m)",
         justify=tk.LEFT).pack(anchor=tk.W, padx=5)

# Düğmeler için çerçeve
button_frame = tk.Frame(main_frame)
button_frame.pack(padx=5, pady=10)

tk.Button(button_frame, text="Hesapla", command=hesapla_gui, bg="#4CAF50", fg="white", width=15).grid(row=0, column=0, padx=5)
tk.Button(button_frame, text="Varsayılan Değerler", command=default_values, bg="#2196F3", fg="white", width=15).grid(row=0, column=1, padx=5)

# Sonuç bölümü
result_frame = tk.Frame(main_frame, bd=2, relief=tk.GROOVE)
result_frame.pack(fill=tk.BOTH, expand=True, padx=5, pady=5)

tk.Label(result_frame, text="Sonuçlar:", font=("Arial", 10, "bold")).pack(anchor=tk.W, padx=5, pady=5)

result_label = tk.Label(result_frame, text="", justify='left', font=("Courier", 10))
result_label.pack(padx=10, pady=10, anchor=tk.W)

# Pencereye ortalama ve minimum boyut
root.update()
window_width = max(600, root.winfo_width())
window_height = max(700, root.winfo_height())
screen_width = root.winfo_screenwidth()
screen_height = root.winfo_screenheight()
x_coordinate = int((screen_width - window_width) / 2)
y_coordinate = int((screen_height - window_height) / 2)
root.geometry(f"{window_width}x{window_height}+{x_coordinate}+{y_coordinate}")
root.minsize(width=500, height=600)

root.mainloop()
