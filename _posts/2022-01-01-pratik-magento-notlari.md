---
layout: post
title:  "Pratik Magento Notları"
language: tr
author: bahadir
categories: [Magento]
excerpt: "Sık kullandığımız magento notlarının kısa bir özeti."
image: "assets/images/magento_ecommerce.jpg" 
tags: [ecommerce, e-ticaret, magento, shopping]
toc: false
---

# Pratik Magento 1.9 Kodları

### Call Phtml from another Phtml

```php
<?php echo $this->getLayout()->createBlock('core/template')->setTemplate('module-folder-name/show.phtml')->toHtml() 
//https://magento.stackexchange.com/questions/196370/how-to-call-phtml-file-in-magento-1-9
?>
```

### Notice Message

```php
Mage::getSingleton('core/session')->addNotice('Please log in to track your order');
```

### Success Message

```php
Mage::getSingleton('core/session')->addSuccess('Tracking successful');
```

### Error Message

```php
Mage::getSingleton('core/session')->addError('There was an error tracking your parcel');
```

### Warning Message

```php
Mage::getSingleton('core/session')->addWarning('Warning Message');
```

### Magmi Sample

```php
<?php
// https://stackoverflow.com/a/35418133
// https://magento.stackexchange.com/questions/9536/magmis-datapump-api-update-changes-nothing-create-works-fine
// assuming that your script file is located in magmi/integration/datapump/product.php,
// include "magmi_defs.php" , once done, you will be able to use any magmi includes without specific path.
require_once("/inc/magmi_defs.php");
//Datapump include
require_once("/inc/magmi_datapump.php");
// create a Product import Datapump using Magmi_DatapumpFactory
$dp=Magmi_DataPumpFactory::getDataPumpInstance("productimport");
$dp->beginImportSession("default","create");
$newProductData = array(
    'type'          => 'simple',
    'sku'           => "A001-2",
    'qty'           => 1000,
    'color'         => 'Blue',
    'price'         => 10,
    'name'          => 'A001-2',
    'tax_class_id'  => 1,
    'is_in_stock'   => 1,
    'store'         => 'admin'
);
$dp->ingest($newProductData);
$newProductData = array(
    'type'          => 'simple',
    'sku'           => "A001-1",
    'qty'           => 1000,
    'color'         => 'Indigo',
    'price'         => 10,
    'name'          => 'A001-1',
    'tax_class_id'  => 1,
    'is_in_stock'   => 1,
    'store'         => 'admin'
);
$dp->ingest($newProductData);
$newProductData = array(
    'type'          => 'configurable',
    'sku'           => "A001",
    'qty'           => 1000,
    'price'         => 10,
    'simples_skus'  => 'A001-2,A001-1',
    'configurable_attributes' => 'color',
    'name'          => 'TREAD JEANS',
    'tax_class_id'  => 1,
    'is_in_stock'   => 1,
    'store'         => 'admin'
);
$dp->ingest($newProductData);
$dp->endImportSession();
?>
```

### Json Response
  ```php
  $json;
  $this->getResponse()->clearHeaders()->setHeader('Content-type','application/json',true);
  return $this->getResponse()->setBody($json);
  ```

### Magento Clear Cache from Bash
```bash
php -r 'require "app/Mage.php"; Mage::app()->getCacheInstance()->flush();'
```