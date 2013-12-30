<?php

namespace PMF;

use PHPUnit_Framework_TestCase;
use Symfony\Component\HttpFoundation\Request;

class RequestFilterTest extends PHPUnit_Framework_TestCase
{
    public function testFilterStringFromQuery()
    {
        $request = Request::create('http://localhost/?foo=1');
        $filter = new RequestFilter($request);

        $this->assertSame('1', $filter->filterInput(INPUT_GET, 'foo', FILTER_SANITIZE_STRING));
        $this->assertNull($filter->filterInput(INPUT_GET, 'bar', FILTER_SANITIZE_STRING));
    }

    public function testFilterStringFromRequestBody()
    {
        $request = Request::create('http://localhost/', 'POST', ['foo' => 1]);
        $filter = new RequestFilter($request);

        $this->assertSame('1', $filter->filterInput(INPUT_POST, 'foo', FILTER_SANITIZE_STRING));
        $this->assertNull($filter->filterInput(INPUT_POST, 'bar', FILTER_SANITIZE_STRING));
    }
} 
