'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">app-cocktail documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AdminMenuComponent.html" data-type="entity-link" >AdminMenuComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AppComponent.html" data-type="entity-link" >AppComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CocktailAddComponent.html" data-type="entity-link" >CocktailAddComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CocktailComponent.html" data-type="entity-link" >CocktailComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CocktailDeleteComponent.html" data-type="entity-link" >CocktailDeleteComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CocktailEditComponent.html" data-type="entity-link" >CocktailEditComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CocktailIndexComponent.html" data-type="entity-link" >CocktailIndexComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ContactComponent.html" data-type="entity-link" >ContactComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DashboardComponent.html" data-type="entity-link" >DashboardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ErrorComponent.html" data-type="entity-link" >ErrorComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HomeComponent.html" data-type="entity-link" >HomeComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LayoutAdminComponent.html" data-type="entity-link" >LayoutAdminComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoginComponent.html" data-type="entity-link" >LoginComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LogoutComponent.html" data-type="entity-link" >LogoutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MenuComponent.html" data-type="entity-link" >MenuComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PlayoutComponent.html" data-type="entity-link" >PlayoutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UserAddComponent.html" data-type="entity-link" >UserAddComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UserDeleteComponent.html" data-type="entity-link" >UserDeleteComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UserEditComponent.html" data-type="entity-link" >UserEditComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UserIndexComponent.html" data-type="entity-link" >UserIndexComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});