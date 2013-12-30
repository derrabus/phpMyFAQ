<?php

namespace PMF;

use LogicException;
use Symfony\Component\HttpFoundation\ParameterBag;
use Symfony\Component\HttpFoundation\Request;

/**
 * Request Filter
 *
 * Emulates the behavior of php's filter extension on Symfony's Request class.
 *
 * @package PMF
 */
class RequestFilter
{
    /**
     * @var Request
     */
    private $request;

    /**
     * @param Request $request
     */
    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    /**
     * The classic filter_input(), with the possibility of specifying a default.
     *
     * Unlike Symfony's request filter, the default value is not sanitized.
     *
     * @param  integer $type          Filter type
     * @param  string  $variable_name Variable name
     * @param  integer $filter        Filter
     * @param  mixed   $default       Default value
     *
     * @return mixed
     */
    public function filterInput ($type, $variable_name, $filter, $default = null)
    {
        $parameters = $this->resolveParameterBag($type);
        if (!$parameters->has($variable_name)) {
            return $default;
        }

        return $parameters->filter($variable_name, $default, false, $filter);
    }

    /**
     * @param $type
     * @return ParameterBag
     */
    private function resolveParameterBag($type)
    {
        switch ($type)
        {
            case INPUT_GET:
                return $this->request->query;
            case INPUT_POST:
                return $this->request->request;
            default:
                return new LogicException('Unsupported input variable type.');
        }
    }
} 
