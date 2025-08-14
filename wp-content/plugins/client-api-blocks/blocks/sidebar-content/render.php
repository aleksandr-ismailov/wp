<?php
/**
 * Server-side rendering for the Sidebar Content block.
 * В headless архитектуре не рендерим HTML, только возвращаем пустоту.
 *
 * @package Client_API_Blocks
 */

// В headless приложении блоки не рендерятся на фронтенде
// Данные получаются через API в client-api-core.php
return '';
