# 003 — HETIC Layout

*Documentation à destination des étudiants présents.*

#### **Principes de base:**

## *Reset CSS.*

À copier sur l'ensemble de vos projets pour partir sur une base saine.

```
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    /* outline: 1px solid red; */
}

a {
    text-decoration: none;
    color: black;
}

ul {
    list-style: none;
}

img {
    display: block;
}
```

## *Grid, comment ça marche.*

Ce snippet permet de créer une grille de douze colonnes égales avec une gouttière de 20 pixels entre chaque.
```
display: grid;
grid-template-columns: repeat(12, 1fr);
grid-gap: 20px;
```

## *Un wrapper, à quoi ça sert ?*

Il se peut que vous ayez besoin d'avoir une section qui fasse 100% de la largeur, dans ce cas, vous pouvez légitimement utiliser un `div.wrapper` pour mettre en forme l'intérieur de votre section.

Dans le cas présent, ce wrapper nous servait notamment à mettre en place des marges internes : 2rem pour les devices jusqu'à 768px, de 768px à 1280px : 5rem et au delà, 20rem de marge interne.

```
/* (mobile first) */
.wrapper {
    padding: 0 2rem;
    @media screen and (min-width: 768px) {
        padding: 0 5rem;
    }
    @media screen and (min-width: 1280px) {
        padding: 0 20rem;
    }
}
```

## *Object-fit, ça sert à quoi?*

Tout comme la propriété background-size qui vous permet de travailler sur la taille des images incluses grâce à `background-image`, object-fit vous permet de travailler sur la taille des images incluses dans le DOM avec `<img>`.

```
width: 100%;
height: 100%;
object-fit: contain;
```

## *Flexbox.*

Utilisé majoritairement en complément de grid (souvent le container est une grille et les éléments de la grille sont en flexbox), flex va vous permettre de positionner vos éléments.

```
display: flex;
```

Pour centrer l'ensemble du contenu horizontalement dans un container.

```
justify-content: center;
```

Pour centrer l'ensemble du contenu verticalement dans un container.
```
align-items: center;
```

Mettre les enfants d'un container flex en colonne.
```
flex-direction: column;
```
***Dans le cas où vous mettez la directive flex-direction à column, les propriétés justify-content & align-items s'inversent : justify pour le vertical, align pour l'horizontal.***

## *Des icônes dans les pseudos-élements ::before & ::after.*

Vous pouvez placer des icônes dans les pseudos éléments ::before & ::after facilement en utilisant ce snippet.

```
::before {
    content: "";
    display: inline-block;
    padding-right: 1.5rem;
    height: 1rem;
    width: 1rem;
    background: url('../resources/tick.svg') no-repeat;
    background-size: contain;
}
```

## *Des questions ?*

N'hésitez pas à revenir vers nous !


[Instagram Arthur](https://instagram.com/arthurwebdev)

[LinkedIn Arthur](https://www.linkedin.com/in/arthur-eichelberger/)

[LinkedIn Vincent](https://www.linkedin.com/in/vincent-schuck-125b40b1/)