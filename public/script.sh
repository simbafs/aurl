cp bss/* .
rm backdoor-1.html  component.html untitled.html
rename 's/html/ejs/' *
sed -i 's/&lt;/</g' *.ejs
sed -i 's/&gt;/>/g' *.ejs
sed -i 's/assets/\/assets/g' *.ejs
rm ../views/* -rf
mv *.ejs ../views/
