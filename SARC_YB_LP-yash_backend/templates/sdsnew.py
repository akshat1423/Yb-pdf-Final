import csv
import os

def clean_csv_file():
    input_file_path = os.path.join(os.path.dirname(__file__), 'data', 'yearbook_id_aryan.csv')
    output_file_path = os.path.join(os.path.dirname(__file__), 'data', 'yearbook_id_aryan1.csv')
    
    with open(input_file_path, newline='', encoding='utf-8-sig') as csvfile:
        reader = csv.DictReader(csvfile)
        
        # Extract the fieldnames (headers) and remove the BOM from the first one if present
        fieldnames = [field.lstrip('\ufeff') for field in reader.fieldnames]

        # Open the output file for writing
        with open(output_file_path, 'w', newline='', encoding='utf-8') as cleaned_csvfile:
            writer = csv.DictWriter(cleaned_csvfile, fieldnames=fieldnames)
            
            # Write the header
            writer.writeheader()
            
            # Write the rows
            for row in reader:
                # Strip BOM from any remaining keys and write to the new file
                cleaned_row = {key.lstrip('\ufeff'): value for key, value in row.items()}
                writer.writerow(cleaned_row)

    print(f"Cleaned CSV file saved as {output_file_path}")

# Call the function to clean the CSV
clean_csv_file()
