cd ..
cd dist
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:hlassiege/inmypocket.git master:gh-pages
cd ..