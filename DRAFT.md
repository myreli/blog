        {# /* Theme Scheme */
        [data-theme="light"],
        :root:not([data-theme="dark"]) {
        --primary: #3949ab;
        --primary-hover: #303f9f;
        --primary-focus: rgba(57, 73, 171, 0.125);
        --primary-inverse: #FFF;
        }

        @media only screen and (prefers-color-scheme: dark) {
            :root:not([data-theme="light"]) {
                --primary: #3949ab;
                --primary-hover: #3f51b5;
                --primary-focus: rgba(57, 73, 171, 0.25);
                --primary-inverse: #FFF;
            }
        } #}