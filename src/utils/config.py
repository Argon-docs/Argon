"""Configuration loader and validator"""

import os
import yaml
from typing import Dict, Any, Optional
from pathlib import Path


class ConfigError(Exception):
    """Configuration error with helpful messages"""
    pass


class Config:
    """Configuration manager for inference engine"""
    
    def __init__(self, config_path: str):
        """Load and validate configuration from YAML file"""
        self.config_path = os.path.abspath(config_path)
        
        if not os.path.exists(self.config_path):
            raise ConfigError(f"Config file not found: {self.config_path}")
        
        with open(self.config_path, 'r') as f:
            self.data = yaml.safe_load(f)
        
        if not self.data:
            raise ConfigError(f"Config file is empty: {self.config_path}")
        
        self._validate()
        self._set_defaults()
    
    def _validate(self):
        """Validate configuration structure"""
        errors = []
        
        # Check required sections
        if 'model' not in self.data:
            errors.append("Missing required section: 'model'")
        
        if 'kernels' not in self.data:
            errors.append("Missing required section: 'kernels'")
        
        if 'inference' not in self.data:
            errors.append("Missing required section: 'inference'")
        
        if errors:
            raise ConfigError(f"Configuration validation failed:\n  - " + "\n  - ".join(errors))
        
        # Validate model section
        model = self.data['model']
        if 'path' not in model or not model['path']:
            errors.append("model.path is required and cannot be empty")
        
        # Validate kernels section
        kernels = self.data['kernels']
        required_kernels = ['decode', 'attention', 'embedding', 'weight_loader']
        for kernel_name in required_kernels:
            if kernel_name not in kernels or not kernels[kernel_name]:
                errors.append(f"kernels.{kernel_name} is required and cannot be empty")
        
        # Validate inference section
        inference = self.data['inference']
        if 'max_seq_len' in inference and (not isinstance(inference['max_seq_len'], int) or inference['max_seq_len'] <= 0):
            errors.append("inference.max_seq_len must be a positive integer")
        
        if 'device' in inference and (not isinstance(inference['device'], int) or inference['device'] < 0):
            errors.append("inference.device must be a non-negative integer")
        
        if errors:
            raise ConfigError(f"Configuration validation failed:\n  - " + "\n  - ".join(errors))
    
    def _set_defaults(self):
        """Set default values for optional fields"""
        # Set inference defaults
        inference = self.data.setdefault('inference', {})
        inference.setdefault('max_seq_len', 1024)
        inference.setdefault('device', 0)
        inference.setdefault('default_temperature', 0.8)
        inference.setdefault('default_top_p', 0.95)
        inference.setdefault('default_repetition_penalty', 1.1)
        inference.setdefault('default_repetition_window', 128)
        inference.setdefault('default_max_tokens', 500)
        
        # Set tokenizer defaults
        model = self.data.setdefault('model', {})
        tokenizer = model.setdefault('tokenizer', {})
        tokenizer.setdefault('use_fast', True)
    
    @property
    def model_path(self) -> str:
        """Get model path"""
        return self.data['model']['path']
    
    @property
    def tokenizer_config(self) -> Dict[str, Any]:
        """Get tokenizer configuration"""
        return self.data['model'].get('tokenizer', {})
    
    @property
    def kernel_decode(self) -> str:
        """Get decode kernel name"""
        return self.data['kernels']['decode']
    
    @property
    def kernel_attention(self) -> str:
        """Get attention kernel name"""
        return self.data['kernels']['attention']
    
    @property
    def kernel_embedding(self) -> str:
        """Get embedding kernel name"""
        return self.data['kernels']['embedding']
    
    @property
    def kernel_weight_loader(self) -> str:
        """Get weight loader kernel name"""
        return self.data['kernels']['weight_loader']
    
    @property
    def max_seq_len(self) -> int:
        """Get maximum sequence length"""
        return self.data['inference']['max_seq_len']
    
    @property
    def device_id(self) -> int:
        """Get device ID"""
        return self.data['inference']['device']
    
    @property
    def default_temperature(self) -> float:
        """Get default temperature"""
        return self.data['inference']['default_temperature']
    
    @property
    def default_top_p(self) -> float:
        """Get default top_p"""
        return self.data['inference']['default_top_p']
    
    @property
    def default_repetition_penalty(self) -> float:
        """Get default repetition penalty"""
        return self.data['inference']['default_repetition_penalty']
    
    @property
    def default_repetition_window(self) -> int:
        """Get default repetition window"""
        return self.data['inference']['default_repetition_window']
    
    @property
    def default_max_tokens(self) -> int:
        """Get default max tokens"""
        return self.data['inference']['default_max_tokens']
    
    def get(self, key_path: str, default: Any = None) -> Any:
        """Get value from config using dot notation (e.g., 'model.path')"""
        keys = key_path.split('.')
        value = self.data
        for key in keys:
            if isinstance(value, dict) and key in value:
                value = value[key]
            else:
                return default
        return value
    
    def to_dict(self) -> Dict[str, Any]:
        """Return configuration as dictionary"""
        return self.data.copy()


def load_config(config_path: Optional[str] = None) -> Config:
    """Load configuration from file"""
    if config_path is None:
        # Look for config.yaml in current directory
        config_path = "config.yaml"
    
    return Config(config_path)

