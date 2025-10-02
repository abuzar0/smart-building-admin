// register-amiri-font.ts
import { jsPDF } from 'jspdf';
import { AmiriRegular } from './Amiri-Regular-normal';
import { AmiriBold } from './Amiri-Bold';


export async function registerAmiriFont(doc: jsPDF): Promise<jsPDF> {

doc.addFileToVFS('Amiri-Regular.ttf', AmiriRegular);
doc.addFont('Amiri-Regular.ttf', 'Amiri', 'normal');

doc.addFileToVFS("Amiri-Bold.ttf", AmiriBold);
doc.addFont("Amiri-Bold.ttf", "Amiri", "bold");

doc.setFont('Amiri');


  return doc;
}